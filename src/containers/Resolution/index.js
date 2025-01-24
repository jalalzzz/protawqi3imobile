import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Constants } from "@common";
import { useDispatch, useSelector } from "react-redux";
import { Header, PdfItem } from "@components";
import styles from "./styles";
import DeviceInfo from "react-native-device-info";
import { Search } from "@images/svg";
import I18n from "@i18n";

const Home = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState("completed");
  const [resolutionType, setResolutionType] = useState();
  const flatListRef = useRef(null);

  const { resolution, isLoading, totalResolutions, resolutionTypes } =
    useSelector((state) => state.resolution);
  console.log(resolutionTypes, "total");
  const { isUpdate } = useSelector((state) => state.user);
  const { isLogout, isShared, token, unLimated } = useSelector(
    (state) => state.register
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { totalNotifications } = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const [status, setStatus] = useState(unLimated ? [3] : [2, 3]);

  const ResolutionRedux = require("@redux/ResolutionRedux");
  const RegisterRedux = require("@redux/RegisterRedux");

  const getDoc = async () => {
    setRefresh(true);
    setOffset(0);
    ResolutionRedux.actions.ResolutionPdf(dispatch, undefined, 0, status);
    setRefresh(false);
  };

  const searchHandler = async (name) => {
    ResolutionRedux.actions.ResolutionPdf(dispatch, name, 0, status);
  };

  console.log(isUpdate, "isUpdate");

  useEffect(() => {
    ResolutionRedux.actions.ResolutionPdf(
      dispatch,
      undefined,
      offset,
      status,
      resolutionType
    );
    ResolutionRedux.actions.ResolutionTypes(dispatch);
    const deviceId = DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
  }, [offset, activeTab, isUpdate, resolutionType]);

  useEffect(() => {
    if (isLogout) {
      if (isShared == Constants.DeviceType.shared) {
        RegisterRedux.actions.resetLogin(dispatch);
        navigation.navigate("SharedDevice");
      } else {
        RegisterRedux.actions.resetLogin(dispatch);
        navigation.navigate("AuthLoading", {
          reset: true,
        });
      }
    }
  }, [isLogout, isUpdate]);

  const renderItem = (resolution) => {
    console.log(resolution, "resolution Li");
    return (
      <PdfItem
        onPress={() => {
          navigation.navigate("Pdf", {
            docSignGuid: resolution?.item?.docSignGuid,
            downloadGuid: resolution?.item?.downloadGuid,
            uri: resolution?.item?.url,
            name: resolution?.item?.name,
            resolution: true,
          });
        }}
        name={resolution?.item?.name?.slice(
          0,
          Dimensions.get("window").width > 600 ? 50 : 30
        )}
        meetingDate={resolution?.item?.createdOnStr}
        number={resolution?.item?.number}
        docSignStatusId={resolution?.item?.docSignStatusId}
        resolution={true}
        newItem={resolution?.item?.lastViewedDate}
        invitees={resolution?.item?.invitees}
        unLimated={unLimated}
        resolution={resolution?.item}
      />
    );
  };

  const logOutHandler = async () => {
    RegisterRedux.actions.logout(dispatch, deviceId);
  };

  const _renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={"gray"} />
    ) : (
      <></>
    );
  };

  const handleLoadMore = async () => {
    if (totalResolutions > resolution.length) {
      setOffset(offset + 10);
    }
  };

  return (
    <View>
      <Header
        totalNotifications={totalNotifications}
        logOut={logOutHandler}
        profile={() => {
          navigation.navigate("Profile");
        }}
        refresh={() => {
          navigation.navigate("Home");
        }}
        spinner={(i) => {
          setLoading(i);
        }}
        notifications={() => {
          navigation.navigate("Notifications");
        }}
        userName={userInfo ? userInfo.nickName + " " + userInfo.shortName : ""}
      />
      {loading ? (
        <ActivityIndicator color={"black"} size={25} />
      ) : (
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 40,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.txt}>{I18n.t("RESOLUTIONS.Resolutions")}</Text>
            <Text
              style={styles.txt}
            >{`(${resolution.length}/${totalResolutions})`}</Text>
          </View>
          <View style={styles.search}>
            <TextInput
              style={styles.txtInput}
              placeholder={I18n.t("Common.SearchRes")}
              onChangeText={(item) => {
                searchHandler(item);
              }}
            />

            <View
              style={
                I18n.locale == "ar-Us"
                  ? {
                      position: "absolute",
                      right: 0,
                      marginRight: 15,
                      color: "#00000033",
                      paddingTop: 15,
                    }
                  : {
                      position: "absolute",
                      left: 0,
                      marginLeft: 15,
                      color: "#00000033",
                      paddingTop: 15,
                    }
              }
            >
              <View
                style={{
                  marginTop: Dimensions.get("window").width > 700 ? 40 : 5,
                }}
              >
                <Search />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "75%",
              marginTop: 20,
            }}
          >
            {unLimated && (
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 40,
                  zIndex: 1,
                  marginBottom: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <FlatList
                    scrollEnabled={false}
                    horizontal
                    data={resolutionTypes}
                    renderItem={({ item }) => {
                      console.log(item, "typspspsp");
                      return (
                        <TouchableOpacity
                          style={{
                            borderColor:
                              resolutionType === item.Value
                                ? "#0877D0"
                                : "gray",
                            marginRight: 10,
                            borderWidth: resolutionType === item.Value ? 3 : 1,
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 7,
                          }}
                          onPress={() => {
                            // setActiveTab(item.Value);
                            setResolutionType(item.Value);
                            setOffset(0);
                            setTimeout(() => {
                              flatListRef.current?.scrollToIndex({
                                animated: true,
                                index: 0,
                              });
                            }, 1000);
                          }}
                        >
                          <View
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 7,
                              backgroundColor:
                                item.Value === "1"
                                  ? "rgb(255, 184, 76)"
                                  : item.Value === "2"
                                  ? "rgb(226, 24, 24)"
                                  : "black",
                            }}
                          />
                          <Text
                            style={{
                              color:
                                activeTab === item.Value && resolutionType
                                  ? "#0877D0"
                                  : "gray",
                              fontSize: 20,
                              fontWeight: "bold",
                              paddingRight: 5,
                            }}
                          >
                            {item.Text}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      borderColor:
                        activeTab === "completed" ? "#0877D0" : "gray",
                      marginRight: 10,
                      borderWidth: activeTab === "completed" ? 3 : 1,
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      setActiveTab("completed");
                      setStatus([3]);
                      setOffset(0);
                      flatListRef.current?.scrollToIndex({
                        animated: true,
                        index: 0,
                      });
                    }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: "rgb(42, 190, 130)",
                      }}
                    />
                    <Text
                      style={{
                        color: activeTab === "completed" ? "#0877D0" : "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingRight: 5,
                      }}
                    >
                      مكتملة
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      borderColor:
                        activeTab === "incompleted" ? "#0877D0" : "gray",
                      marginRight: 10,
                      borderWidth: activeTab === "incompleted" ? 3 : 1,
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      setActiveTab("incompleted");
                      setStatus([2]);
                      setOffset(0);
                      flatListRef.current?.scrollToIndex({
                        animated: true,
                        index: 0,
                      });
                    }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: "#0877D0",
                      }}
                    />
                    <Text
                      style={{
                        color: activeTab === "incompleted" ? "#0877D0" : "gray",
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingRight: 5,
                      }}
                    >
                      غير مكتملة
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{ paddingBottom: 120 }}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={getDoc} />
              }
              data={resolution}
              renderItem={(item, index) => renderItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReached={handleLoadMore}
              ListFooterComponent={_renderFooter}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
