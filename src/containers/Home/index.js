import { Constants } from "@common";
import { Header, PdfItem } from "@components";

import styles from "./styles";
import DeviceInfo from "react-native-device-info";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import I18n from "@i18n";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@images/svg";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [offset, setOffset] = useState(0);

  const { isLoading, invitations, totalInvitations } = useSelector(
    (state) => state.pdf
  );
  const { isLogout, isShared } = useSelector((state) => state.register);
  const { userInfo } = useSelector((state) => state.auth);
  const { totalNotifications } = useSelector((state) => state.notification);
  const isUpdate = useSelector((state) => state.user.isUpdate);

  const dispatch = useDispatch();
  const InvitationRedux = require("@redux/InvitationRedux");
  const RegisterRedux = require("@redux/RegisterRedux");
  console.log(totalNotifications);
  const getDoc = async () => {
    InvitationRedux.actions.InvitationPdf(dispatch, undefined, offset);
    setRefresh(false);
  };
  const searchHandler = async (name) => {
    InvitationRedux.actions.InvitationPdf(dispatch, name, 0);
  };

  console.log(isUpdate, "isUpdate");

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = InvitationRedux.actions.InvitationPdf(
        dispatch,
        undefined,
        offset
      );

      return () => unsubscribe;
    }, [])
  );

  useEffect(() => {
    InvitationRedux.actions.InvitationPdf(dispatch, undefined, offset);
    const deviceId = DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
  }, [offset, isUpdate]);

  useEffect(() => {
    if (isLogout) {
      if (isShared === Constants.DeviceType.shared) {
        RegisterRedux.actions.resetLogin(dispatch);
        navigation.navigate("SharedDevice");
      } else {
        RegisterRedux.actions.resetLogin(dispatch);
        navigation.navigate("AuthLoading", {
          reset: true,
        });
      }
    }
  }, [isLogout]);

  const renderItem = (invetation) => {
    return (
      <PdfItem
        onPress={() => {
          navigation.navigate("Pdf", {
            docSignGuid: invetation.item.docSignGuid,
            downloadGuid: invetation.item.downloadGuid,
            uri: invetation.item.url,
            name: invetation.item.name,
          });
        }}
        name={invetation.item.name}
        meetingDate={invetation.item.meetingDate}
        number={invetation.item.number}
        docSignStatusId={invetation.item.docSignStatusId}
        newItem={invetation.item.lastViewedDate}
        isUserConfirmed={invetation.item.isUserConfirmed}
      />
    );
  };

  console.log(isLoading, "isLoading");
  const _renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={"gray"} />
    ) : (
      <></>
    );
  };
  const logOutHandler = async () => {
    RegisterRedux.actions.logout(dispatch, deviceId);
  };

  const handleLoadMore = async () => {
    if (totalInvitations > invitations.length) {
      setOffset(offset + 10);
    } else {
      return;
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
        notifications={() => {
          navigation.navigate("Notifications");
        }}
        spinner={(i) => {
          setLoading(i);
        }}
        userName={userInfo ? userInfo.nickName + " " + userInfo.shortName : ""}
      />
      {loading ? (
        <ActivityIndicator color={"black"} size={25} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.txt}>{I18n.t("INVITATIONS.InvitationsMsg")}</Text>
          <View style={styles.search}>
            <TextInput
              style={styles.txtInput}
              placeholder={I18n.t("Common.SearchInv")}
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
            <FlatList
              contentContainerStyle={{ paddingBottom: 120 }}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={getDoc} />
              }
              data={invitations}
              renderItem={(item, index) => renderItem(item, index)}
              keyExtractor={(item) => item.id}
              onEndReached={handleLoadMore}
              ListFooterComponent={_renderFooter}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
