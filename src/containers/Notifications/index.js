import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Header } from "@components";
import styles from "./styles";
import I18n from "@i18n";
import BackIcon from "react-native-vector-icons/Ionicons";
import CloseIcon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotifications } from "../../redux/Actions/Notifications";
import Spacer from "../../components/Spacer/";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import "moment/locale/ar";

const Notifications = ({ navigation }) => {
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const pushNotificationsRedux = require("@redux/PushNotificationsRedux");
  const { notifications, isLoading, totalNotifications } = useSelector(
    (state) => {
      console.log(state, "state");
      return state.notification;
    }
  );
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = pushNotificationsRedux.actions.GetAllNotifications(
        dispatch,
        offset
      );

      return () => unsubscribe;
    }, [])
  );

  useEffect(() => {
    if (notifications.length < totalNotifications && !isLoading) {
      pushNotificationsRedux.actions.GetAllNotifications(dispatch, offset);
    }
  }, [offset]);

  console.log(isLoading, "isLoading");

  const handleDeleteNotification = (id) => {
    pushNotificationsRedux.actions.DeleteSingleNotification(dispatch, id);
  };

  const _renderFooter = () => {
    return isLoading && <ActivityIndicator size="large" color={"#0877D0"} />;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "lightgray" }}>
      <View
        style={{
          height: 100,
          backgroundColor: "#0877D0",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackIcon name="md-chevron-forward" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>{I18n.t("Common.notifications")}</Text>
        <View />
      </View>
      <FlatList
        data={notifications}
        refreshing={isLoading}
        onEndReached={() => setOffset(offset + 20)}
        onRefresh={() =>
          pushNotificationsRedux.actions.GetAllNotifications(dispatch, 0)
        }
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                // borderWidth: 1,
                padding: 20,
                marginHorizontal: 7.5,
                marginVertical: 5,
                backgroundColor: "white",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#0877D0" }}
                >
                  {item.Title}
                </Text>
                <Spacer />
                <Text style={{ fontSize: 12, textAlign: "left" }}>
                  {item.Body}
                </Text>
                <Spacer />
                <Text style={{ fontSize: 12 }}>
                  {moment
                    .utc(item?.CreatedOnUtc)
                    .local()
                    .locale("ar")
                    .startOf("seconds")
                    .fromNow()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteNotification(item?.Id)}
                style={{ paddingVertical: 30 }}
              >
                <CloseIcon name="close" size={25} color={"#0877D0"} />
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={_renderFooter}
      />
    </View>
  );
};

export default Notifications;
