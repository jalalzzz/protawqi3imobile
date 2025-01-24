import { View, Text } from "react-native";
import React from "react";
import { FirstStepSharedDevice, SecondStepRegester } from "@components";

const SanadVerification = ({ navigation, route }) => {
  const { code } = route?.params ?? {};
  console.log(route, "route");
  return (
    <SecondStepRegester
      code={code}
      onChange={(i) => {
        console.log("first");
      }}
      navigation={navigation}
    />
  );
};

export default SanadVerification;
