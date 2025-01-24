import {
  HeaderPdf,
  Info,
  SignList,
  TabPdf,
  Attachment,
  ConfirmePdf,
  AppLoading,
  AttachmentNote,
  ThirdStepRegester,
} from "@components";
import RBSheet from "react-native-raw-bottom-sheet";

import styles from "./styles";
import React, { PureComponent } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Modal,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { UserService } from "@services";
import { connect } from "react-redux";
import PdfAttachment from "react-native-pdf";
import AntDesign from "react-native-vector-icons/AntDesign";
import I18n from "@i18n";
import { Config, Constants, Images } from "@common";
import TouchID from "react-native-touch-id";
import deviceInfoModule from "react-native-device-info";

var arrNo = [];
var leftNumber = [];
var rightNumber = [];
var centerNumber = [];
let deviceId = deviceInfoModule.getUniqueId();
class Pdf extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 2,
      attachmentPageNo: 0,
      attachmentName: null,
      showNotes: false,
      modalVisibleTwo: false,
      confirmState: false,
      showRes: false,
      noPage: 0,
      currentPage: 1,
      docSignGuid: null,
      uriAttachment: null,
      attachment: false,
      showSignLocation: false,
      loading: false,
      modalVisible: false,
      reason: "",
      reasonError: false,
      namePdf: null,
      unLimated: false,
      spearator: "...",
      pointer: false,
    };
  }

  componentDidMount = async () => {
    const { route } = this.props;
    console.log(this.props, "props");
    const { docSignGuid, downloadGuid } = route.params;
    if (this.props.attachmentList && this.props.attachmentList[0]) {
      await this.props.getAttachmentNotes(
        this.state.docSignGuid,
        this.props.attachmentList[0].Id
      );
    }
    this.props.viewDoc(docSignGuid, this.props.longitude, this.props.latitude);
    this.checkSign();
    this.props.checkToUpdateSignPic();
    var userInformation = await UserService.getUser(this.props.dataToken);
    this.setState({
      docSignGuid: docSignGuid,
      unLimated: userInformation.unlimitedAccess,
    });
    leftNumber = [];
    rightNumber = [];
    arrNo = [];
    centerNumber = [];
    this.props.getUserInfo();
    await this.props.getInfoDocument(docSignGuid);
    this.props.downloadDocSign(downloadGuid);
  };

  componentWillUnmount = () => {
    this.props.clearDownloadDocSign();
  };

  checkSign = async () => {
    const { route } = this.props;
    const { docSignGuid } = route.params;
    await this.props.checkSign(docSignGuid);
  };

  componentWillReceiveProps = async (nextProps) => {
    if (
      this.props.isUpdate !== nextProps.isUpdate &&
      this.props.isLoading !== nextProps.isLoading
    ) {
      this.setState({ loading: false });
      // this.props.navigation.navigate("Home");
    }
    if (this.props.isSuccess == false && nextProps.isSuccess !== true) {
      if (nextProps.error == "TokenLocked") {
        //Handel Logout
        Alert.alert(
          "خطأ في رمز الهوية الرقمية",
          ".لقد حدثت مشكلة في رمز الهوية الرقمية الخاصة بك في النظام، يرجى مراجعة وزارة الأقتصاد الرقمي ",
          [
            {
              text: "OK",
              onPress: () => {
                this.logoutCodeError();
              },
            },
          ]
        );
      } else if (nextProps.error == "UserVerifyNotValid") {
        Alert.alert(
          "خطأ في رمز الهوية الرقمية",
          "رمز الهوية الرقمية في النظام غير صحيح يرجى تسجيل الدخول مره اخرى",
          [
            {
              text: "OK",
              onPress: () => {
                this.logoutCodeError();
              },
            },
          ]
        );
      }
    } else if (this.props.isSuccess == false && nextProps.isSuccess === true) {
      this.props.navigation.navigate("Resolution");
    }
    // if (nextProps.isLogout) {
    //   if (this.props.isShared == Constants.DeviceType.shared) {
    //     RegisterRedux.actions.resetLogin(dispatch);
    //     // navigation.navigate("SharedDevice");
    //   } else {
    //     RegisterRedux.actions.resetLogin(dispatch);
    //     // navigation.navigate("AuthLoading", {
    //     //   reset: true,
    //     // });
    //   }
    // }
    //console.log(nextProps, "nextProps");

    // if (this.props.isView !== nextProps.isView) {
    //   this.props.navigation.navigate("Resolution");
    // }
  };
  logoutCodeError = () => {
    this.props.logout(deviceId);
    this.props.resetLogin();
    if (this.props.isShared == Constants.DeviceType.shared) {
      this.props.navigation.navigate("SharedDevice");
    } else {
      this.props.navigation.navigate("Register");
    }
  };
  rejectHandler = () => {
    this.setModalVisible(true);
  };
  cancelRejectHandler = async () => {
    await this.props.updateSign(
      this.state.docSignGuid,
      Constants.docSignUserStatus.Viewed,
      "",
      this.props.longitude,
      this.props.latitude,
      this.props.navigation,
      this.props.isShared
    );

    this.props.navigation.navigate("Home");
  };

  setModalVisibleTwo = (visible) => {
    this.setState({ modalVisibleTwo: visible });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, reasonError: false });
  };
  getFirstNotes = async (attachmentid) => {
    await this.props.getAttachmentNotes(this.state.docSignGuid, attachmentid);
  };
  yesRejectHandler = async () => {
    const { route } = this.props;
    const { docSignGuid } = route.params;
    if (this.state.reason.length <= 0) {
      this.setState({ reasonError: true });
    } else {
      this.setState({ reasonError: false });
      await this.props.updateSign(
        docSignGuid,
        Constants.docSignUserStatus.Refused,
        this.state.reason,
        this.props.longitude,
        this.props.latitude,
        this.props.navigation,
        this.props.isShared
      );
      this.setModalVisible(false);
      this.props.navigation.navigate("Home");
    }
  };
  onSwipeLeft(gestureState) {
    this.setState({ pointer: true });
    //alert('left');
  }

  onSwipeRight(gestureState) {
    this.setState({ pointer: true });
    //alert('right');
  }
  onSwipeUp(gestureState) {
    this.setState({ pointer: false });
  }

  onSwipeDown(gestureState) {
    this.setState({ pointer: false });
  }

  noPage = (no) => {
    var start = 3;
    var end = 6;
    if (this.state.noPage > 0 && arrNo <= 0) {
      for (let i = 0; i < this.state.noPage; i++) {
        arrNo.push(i + 1);
      }
    }
    if (this.state.noPage > 0 && arrNo !== 20 && arrNo.length > 10) {
      if (centerNumber.length <= 0) {
        leftNumber = arrNo.slice(0, 6);
      }
      rightNumber = arrNo.slice(arrNo.length - 1, arrNo.length);

      if (this.state.currentPage == leftNumber.length) {
        centerNumber = [
          this.state.currentPage - 2,
          this.state.currentPage - 1,
          this.state.currentPage,
          this.state.currentPage + 1,
          this.state.currentPage + 2,
        ];
        leftNumber = arrNo.slice(0, 1);
      }
      if (
        this.state.currentPage == centerNumber[centerNumber.length - 1] &&
        centerNumber.length > 0 &&
        this.state.currentPage <= arrNo[arrNo.length - 6]
      ) {
        start = this.state.currentPage - 1;
        end = this.state.currentPage + 2;

        centerNumber = [];
        centerNumber = [
          this.state.currentPage - 2,
          this.state.currentPage - 1,
          this.state.currentPage,
          this.state.currentPage + 1,
          this.state.currentPage + 2,
        ];
        leftNumber = arrNo.slice(0, 1);
      }

      end = this.state.currentPage + 2;
      if (this.state.currentPage > arrNo[arrNo.length - 6]) {
        centerNumber = [];
        leftNumber = arrNo.slice(0, 6);
        rightNumber = arrNo.slice(arrNo.length - 5, arrNo.length);
      }

      if (
        this.state.currentPage == arrNo[arrNo.length - 5] &&
        centerNumber.length == 0
      ) {
        leftNumber = arrNo.slice(0, 1);
        rightNumber = arrNo.slice(arrNo.length - 1, arrNo.length);
        centerNumber = [
          this.state.currentPage - 2,
          this.state.currentPage - 1,
          this.state.currentPage,
          this.state.currentPage + 1,
          this.state.currentPage + 2,
        ];
      }

      if (this.state.currentPage < centerNumber[0] && rightNumber.length < 2) {
        leftNumber = arrNo.slice(0, 1);
        rightNumber = arrNo.slice(arrNo.length - 1, arrNo.length);
        centerNumber = [
          this.state.currentPage - 2,
          this.state.currentPage - 1,
          this.state.currentPage,
          this.state.currentPage + 1,
          this.state.currentPage + 2,
        ];
      }
      if (
        this.state.currentPage < arrNo[3] &&
        leftNumber.length < 2 &&
        this.state.currentPage !== 3
      ) {
        leftNumber = arrNo.slice(0, 6);
        rightNumber = arrNo.slice(arrNo.length - 1, arrNo.length);
        centerNumber = [];
      }
    }
    if (this.state.currentPage - 1 == no) {
      centerNumber = [no - 2, no - 1, no, no + 1, no + 2];
    }
  };

  ConfirmedHandler = () => {
    this.setState({ confirmState: true });
  };

  clickHandler = (no) => {
    this.setState({ currentPage: no });
    this.noPage(no);
  };

  handleBiometric = async () => {
    if (this.props.isShared != Constants.DeviceType.shared) {
      TouchID.isSupported(Constants.TouchIdConfig).then(() => {
        TouchID.authenticate("", Constants.TouchIdConfig)
          .then(() => {
            this.updateSignHandler();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      this.updateSignHandler();
    }
  };

  updateSignHandler = () => {
    this.props.updateSign(
      this.state.docSignGuid,
      Constants.docSignUserStatus.Confirmed,
      null,
      this.props.longitude,
      this.props.latitude,
      this.props.navigation,
      this.props.isShared
    );
  };

  onSwipe(gestureName) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        if (this.state.attachmentPageNo < this.props.attachmentList?.length) {
          const nextAttachment =
            this.props.attachmentList[this.state.attachmentPageNo];
          this.setState({
            uriAttachment: nextAttachment.DownloadUrl,
            attachmentPageNo: ++this.state.attachmentPageNo,
            attachmentName: nextAttachment.Name,
            attachmentId: nextAttachment.Id,
          });
          this.props.getAttachmentNotes(
            this.state.docSignGuid,
            nextAttachment.Id
          );
        }
        break;
      case SWIPE_RIGHT:
        if (this.state.attachmentPageNo > 1) {
          const previousAttachment =
            this.props.attachmentList[this.state.attachmentPageNo - 2];
          this.setState({
            uriAttachment: previousAttachment.DownloadUrl,
            attachmentPageNo: --this.state.attachmentPageNo,
            attachmentName: previousAttachment.Name,
            attachmentId: previousAttachment.Id,
          });
          this.props.getAttachmentNotes(
            this.state.docSignGuid,
            previousAttachment.Id
          );
        }
        break;
    }
  }
  getNotesHandler = () => {
    this.setState({ showNotes: true });
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const { modalVisible, modalVisibleTwo } = this.state;
    const { route } = this.props;
    const { docSignGuid, uri, name, resolution } = route.params;
    this.setState({ namePdf: name });
    if (this.state.index == 2 && this.state.attachment == false) {
      this.setState({ uriAttachment: uri });
    }
    this.setState({ docSignGuid: docSignGuid });
    if (resolution) {
      this.setState({ showSignLocation: true });
    }
    const source = {
      // uri: `${Config.BaseUrl.url}/${
      //   // !this.state.

      //   //   ? !this.props.isDocLoading
      //   //     ? this.props.fileBytesData
      //   //     : null
      //   //   : this.state.uriAttachment
      // }`,
      cache: true,
    };

    console.log(this.state.noPage, "noPPPAGEEE");
    return this.props.isDocLoading ? (
      <AppLoading />
    ) : (
      <>
        <View style={styles.containerMain}>
          <View style={{ width: "100%" }}>
            {this.state.showRes == false && (
              <HeaderPdf
                goBack={() => {
                  // this.props.clearDownloadDocSign();
                  // hamza
                  this.props.navigation.goBack();
                  // this.state.confirmState
                  //   ? this.setState({ confirmState: false })
                  //   : // : this.state.showSignLocation
                  //   // ? this.setState({ showSignLocation: false })
                  //   resolution
                  //   ? this.props.ResolutionPdf()
                  //   : this.props.InvitationPdf();
                }}
                name={this.state.namePdf}
              />
            )}

            <>
              <TabPdf
                onchangeIndex={(i) => {
                  this.setState({
                    index: i,
                    attachment: false,
                    currentPage: 1,
                  });
                }}
                unLimated={this.state.unLimated}
                resolution={resolution}
                attachmentList={this.props.attachmentList}
                getAttachmentNotes={this.props.getAttachmentNotes}
                clearAttachmentNotes={this.props.clearAttachmentNotes}
              />
              <View style={styles.pdfContainer}>
                <ScrollView style={styles.centeredView}>
                  <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      this.setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.txtModal}>
                          {resolution
                            ? I18n.t("REFUSE.Title")
                            : I18n.t("REFUSE.TitleInv")}
                        </Text>
                        <Text style={styles.txtQustion}>
                          {resolution
                            ? I18n.t("REFUSE.Desc")
                            : I18n.t("REFUSE.DescInv")}
                        </Text>
                        <View
                          style={{
                            borderBottomColor: "#00000033",
                            borderBottomWidth: 1,
                            width: "100%",
                            marginTop: 20,
                          }}
                        />
                        <Text style={styles.reason}>
                          {resolution
                            ? I18n.t("REFUSE.Reason")
                            : I18n.t("REFUSE.ReasonInv")}
                        </Text>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              borderColor: this.state.reasonError
                                ? "red"
                                : "#00000033",
                              height: 150,
                              textAlignVertical: "top",
                              fontFamily: "DINNextLTArabic-Regular",
                              marginHorizontal: 10,
                              width: "90%",
                            },
                          ]}
                          multiline={true}
                          numberOfLines={10}
                          onChangeText={(i) => {
                            this.setState({ reason: i });
                          }}
                          placeholder={I18n.t("REFUSE.placeholder")}
                        />
                        <View
                          style={{
                            flexDirection: "column",
                          }}>
                          <View
                            style={{
                              borderBottomColor: "#00000033",
                              borderBottomWidth: 1,
                              width: "95%",
                              alignSelf: "center",
                            }}
                          />

                          <View
                            style={{
                              flexDirection:
                                Platform.OS == "ios" ? "row-reverse" : "row",
                            }}>
                            <TouchableOpacity
                              style={styles.touch}
                              onPress={() => {
                                this.setModalVisible(false);
                              }}>
                              <Text
                                style={{
                                  textAlign: "center",
                                  color: "#0877d0",
                                  fontFamily: "DINNextLTArabic-Regular",
                                }}>
                                {I18n.t("REFUSE.Cancel")}
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                height: "100%",
                                width: 1,
                                backgroundColor: "#00000033",
                              }}></View>
                            <TouchableOpacity
                              style={styles.touch}
                              onPress={() => {
                                this.yesRejectHandler();
                              }}>
                              <Text
                                style={{
                                  textAlign: "center",
                                  color: "#0877d0",
                                  fontFamily: "DINNextLTArabic-Regular",
                                }}>
                                {I18n.t("REFUSE.Yes")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setModalVisible(true)}>
                    <Text style={styles.textStyle}></Text>
                  </Pressable>
                </ScrollView>

                <View style={styles.container}>
                  {this.state.index == 2 ? (
                    <View
                      style={{
                        marginTop: this.state.attachment ? 0 : -60,
                      }}>
                      {this.state.attachment && (
                        <View style={styles.attachmentHeader}>
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.showAttach,
                              { width: "30%", textAlign: "right" },
                            ]}>
                            {this.state.attachmentName}
                          </Text>
                          <Text
                            style={[
                              styles.showAttach,
                              {
                                alignSelf: "center",
                                marginHorizontal:
                                  this.props.attachmentNoteData.length > 0
                                    ? "30%"
                                    : "50%",
                              },
                            ]}>
                            {`${this.state.attachmentPageNo} / ${this.props.attachmentList?.length}`}
                          </Text>
                          {this.props.attachmentNoteData.length > 0 && (
                            <TouchableOpacity
                              style={styles.notesBtn}
                              onPress={() => {
                                this.getNotesHandler();
                              }}>
                              <Text
                                style={[
                                  styles.showAttach,
                                  { color: "#ffffff", textAlign: "center" },
                                ]}>
                                {I18n.t("DOC_SIGN.Notes")}
                              </Text>
                            </TouchableOpacity>
                          )}

                          <Modal
                            animationType='slide'
                            transparent={true}
                            visible={this.state.showNotes}
                            onRequestClose={() => {
                              Alert.alert("Modal has been closed.");
                              this.setModalVisible(!modalVisible);
                            }}>
                            <View style={[styles.centeredView]}>
                              <View
                                style={[
                                  styles.modalView,
                                  {
                                    minHeight:
                                      Dimensions.get("window").height * 0.15,
                                    paddingBottom: 15,
                                  },
                                ]}>
                                <View style={styles.popupHeder}>
                                  <TouchableOpacity
                                    style={styles.closeBtn}
                                    onPress={() => {
                                      this.setState({ showNotes: false });
                                    }}>
                                    <AntDesign
                                      name='close'
                                      size={24}
                                      style={{
                                        color: "white",
                                      }}
                                    />
                                  </TouchableOpacity>
                                  <Text
                                    style={[
                                      styles.showAttach,
                                      { color: "#0877D0" },
                                    ]}>
                                    {I18n.t("DOC_SIGN.Notes")}
                                  </Text>
                                </View>
                                <AttachmentNote
                                  notes={this.props.attachmentNoteData}
                                />
                              </View>
                            </View>
                          </Modal>
                        </View>
                      )}

                      {/* pagination */}
                      <View>
                        <GestureRecognizer
                          onSwipe={(direction, state) =>
                            this.state.attachment
                              ? this.onSwipe(direction, state)
                              : {}
                          }
                          config={config}>
                          <PdfAttachment
                            page={-1}
                            maxScale={3}
                            minScale={1.17}
                            fitPolicy={2}
                            spacing={10}
                            cache={true}
                            expiration={300}
                            source={{
                              uri: this.state.attachment
                                ? `${Config.BaseUrl.url}${this.state.uriAttachment}`
                                : !this.props.isDocLoading
                                ? this.props.fileBytesData
                                : null,
                            }}
                            trustAllCerts={false}
                            onLoadComplete={(numberOfPages, filePath) => {
                              this.setState({ noPage: numberOfPages });
                            }}
                            onPageChanged={(page, numberOfPages) => {
                              this.setState({ currentPage: page });
                            }}
                            //page={this.state.currentPage}
                            onError={(error) => {
                              //console.log(error);
                            }}
                            onPressLink={(uri) => {
                              //console.log(`Link pressed: ${uri}`);
                            }}
                            style={[
                              styles.pdf,
                              {
                                width: Dimensions.get("screen").width,
                                height: Dimensions.get("screen").height - 200,
                                marginTop: this.state.attachment
                                  ? 10
                                  : Dimensions.get("window").width > 600
                                  ? 30
                                  : 20,
                              },
                            ]}
                          />
                        </GestureRecognizer>
                      </View>
                    </View>
                  ) : this.state.index == 1 ? (
                    <Attachment
                      docSignGuid={this.state.docSignGuid}
                      onOpenAttachment={(uri, pageNo, attachmentName) => {
                        this.setState({
                          uriAttachment: uri,
                          index: 2,
                          attachment: true,
                          attachmentPageNo: pageNo,
                          attachmentName: attachmentName,
                        });
                      }}
                      getNotes={(attachmentId) => {
                        this.getFirstNotes(attachmentId);
                      }}
                    />
                  ) : this.state.index == 3 ? (
                    <Info
                      docSignGuid={this.state.docSignGuid}
                      onChangeInfo={(i) => {
                        this.setState({ noPage: i });
                      }}
                      resolution={resolution}
                    />
                  ) : (
                    <SignList
                      docSignGuid={this.state.docSignGuid}
                      resolution={resolution}
                    />
                  )}
                </View>
              </View>
            </>
          </View>
          {!resolution && (
            <View style={styles.bottomView}>
              {this.props.signStatus ? (
                // this.props.signStatus.status &&
                !this.state.attachment && this.state.index == 2 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: this.props.signStatus.status
                        ? "red"
                        : "#0877D0",
                      borderWidth: 5,
                      borderColor: "#EFEFF4",
                      padding: 15,
                    }}>
                    <TouchableOpacity
                      style={styles.touchRejectFull}
                      onPress={() => {
                        {
                          this.props.signStatus.status
                            ? this.rejectHandler()
                            : this.cancelRejectHandler();
                        }
                      }}>
                      <Text style={styles.reject}>
                        {this.props.signStatus.status
                          ? I18n.t("DOC_SIGN.Refuse")
                          : I18n.t("DOC_SIGN.CancelRefuse")}
                      </Text>
                    </TouchableOpacity>
                    {/* <View style={styles.verticleLine}></View>
                    <TouchableOpacity
                      style={styles.touchReject}
                      onPress={() => {
                        this.ConfirmedHandler();
                      }}
                    >
                      <Text style={styles.sign}>
                        {I18n.t("DOC_SIGN.Confirm")}

                        {this.state.loading && (
                          <View style={{}}>
                            <ActivityIndicator color="black" size={"small"} />
                          </View>
                        )}
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </View>
          )}
          {resolution &&
          this.state.showSignLocation == false &&
          this.state.index == 2 &&
          this.props.signStatus &&
          this.props.signStatus.status ? (
            <View style={styles.bottomView}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0877D0",
                  width: "92%",
                  marginBottom: 10,
                }}
                onPress={() => {
                  this.setState({
                    currentPage: this.props.docInfo
                      ? this.props.docInfo.UserSignPageIndex
                      : null,
                    showSignLocation: true,
                  });
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width < 700 ? 15 : 22,
                    fontFamily: "DINNextLTArabic-Regular",
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}>
                  {I18n.t("DOC_SIGN.Sign")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {this.state.showSignLocation && (
            <View style={styles.bottomView}>
              {this.props.signStatus ? (
                this.props.signStatus.status &&
                !this.state.attachment &&
                !this.state.confirmState &&
                this.state.index == 2 ? (
                  <View
                    style={{
                      flexDirection:
                        Platform.OS == "android" ? "row" : "row-reverse",
                      backgroundColor: "#0877D0",
                      borderWidth: 5,
                      borderColor: "#EFEFF4",
                      padding: 15,
                    }}>
                    {/* <TouchableOpacity
                      style={styles.touchReject}
                      onPress={() => {
                        this.rejectHandler();
                      }}
                    >
                      <Text style={styles.reject}>
                        {I18n.t("DOC_SIGN.Refuse")}
                      </Text>
                    </TouchableOpacity> */}
                    {/* <View style={styles.verticleLine}></View> */}
                    <TouchableOpacity
                      style={styles.touchRejectFull}
                      onPress={() => {
                        if (this.props.mustSign) {
                          this.RBSheet.open();
                        } else {
                          this.handleBiometric();
                        }
                      }}>
                      <Text style={styles.sign}>
                        {I18n.t("DOC_SIGN.SignRes")}
                        {this.state.loading && (
                          <View style={{}}>
                            <ActivityIndicator color='black' size={"small"} />
                          </View>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </View>
          )}
          {this.state.modalVisibleTwo && !resolution && (
            <View
              style={{
                alignSelf: "center",
                width: "90%",
                position: "absolute",
                marginTop: "60%",
                height: 400,
                backgroundColor: "white",
                height: 200,
              }}>
              <Image
                source={Images.people}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: "contain",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  marginTop: 20,
                  color: "#00000099",
                  textAlign: "center",
                  width: "70%",
                  alignSelf: "center",
                }}>{`لقد تم تأكيد حضور إجتماع مجلس الوزراء الموافق ${
                this.props.docInfo
                  ? this.props.docInfo.MeetingDateStr
                    ? this.props.docInfo.MeetingDateStr
                    : ""
                  : ""
              }`}</Text>
              <TouchableOpacity
                style={{
                  width: "80%",
                  backgroundColor: "#0877D0",
                  marginTop: 20,
                  alignSelf: "center",
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "70%",
                    alignSelf: "center",
                  }}>
                  {I18n.t("Common.Close")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={600}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
              },
            }}>
            <ThirdStepRegester
              checkToUpdateSignPic={this.props.checkToUpdateSignPic}
              RBSheetRef={this.RBSheet}
              OnChangeSign={true}
            />
          </RBSheet>
        </View>
      </>
    );
  }
}
const mapStateToProps = ({
  user,
  register,
  auth,
  docSign,
  pdf,
  resolution,
  location,
}) => ({
  fileBytesData: docSign.fileBytesData,
  signStatus: user.signStatus,
  isUpdate: user.isUpdate,
  dataToken: register.token,
  userInfo: auth.userInfo,
  docInfo: user.docInfo,
  mustSign: user.mustSign,
  isDocLoading: docSign.isLoading,
  isLoading: pdf.isLoading,
  isView: resolution.isView,
  longitude: location.longitude,
  latitude: location.latitude,
  attachmentList: user.attachmentList,
  isNotesLoading: docSign.isLoading,
  attachmentNoteData: docSign.attachmentNoteData,
  isShared: register.isShared,
  isSuccess: user.isSuccess,
  isLogin: register.isLogin,
  error: user.error,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const UserRedux = require("@redux/UserRedux");
  const AuthRedux = require("@redux/AuthRedux");
  const DocSignRedux = require("@redux/DocSignRedux");
  const InvitationRedux = require("@redux/InvitationRedux");
  const ResolutionRedux = require("@redux/ResolutionRedux");
  const RegisterRedux = require("@redux/RegisterRedux");
  return {
    ...ownProps,
    ...stateProps,
    InvitationPdf: () => {
      InvitationRedux.actions.InvitationPdf(dispatch);
    },
    ResolutionPdf: () => {
      ResolutionRedux.actions.ResolutionPdf(dispatch);
    },
    checkSign: (id) => {
      UserRedux.actions.checkSign(dispatch, id);
    },
    getInfoDocument: (id) => {
      UserRedux.actions.getInfoDocument(dispatch, id);
    },
    viewDoc: (id, longitude, latitude) => {
      UserRedux.actions.viewDoc(dispatch, id, longitude, latitude);
    },
    updateSign: (
      id,
      statusId,
      reason,
      longitude,
      latitude,
      navigation,
      isShared
    ) => {
      UserRedux.actions.updateSign(
        dispatch,
        id,
        statusId,
        reason,
        longitude,
        latitude,
        navigation,
        isShared
      );
    },
    checkToUpdateSignPic: () => {
      UserRedux.actions.checkToUpdateSignPic(dispatch, true);
    },
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
    downloadDocSign: (id) => {
      DocSignRedux.actions.downloadDocSign(dispatch, id);
    },
    clearDownloadDocSign: () => {
      DocSignRedux.actions.clearDownloadDocSign(dispatch);
    },
    getAttachmentNotes: (docSignGuid, attachmentId) => {
      DocSignRedux.actions.getAttachmentNotes(
        dispatch,
        docSignGuid,
        attachmentId
      );
    },
    logout: (deviceId) => {
      RegisterRedux.actions.logout(dispatch, deviceId);
    },
    resetLogin: () => {
      RegisterRedux.actions.resetLogin(dispatch);
    },
    clearAttachmentNotes: () => {
      UserRedux.actions.clearAttachmentNotes(dispatch);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Pdf);
