import { IpError } from "@images/svg/IpError";
import ButtonSubmit from "@components/ButtonSubmit";
import React from "react";
import { DevSettings, Text, View } from "react-native";
import I18n from "@i18n";
import styles from "./styles";

const IpChanged =(props)=>{
    return (
      <View style={styles.container}>
       <View style={styles.ipImage}>
        <IpError/>
        <Text style={styles.ipText}>IP CHANGED!</Text>
       </View>
       <View >
        <Text style={styles.msgLabel}>{I18n.t("ip.ipLabel")}</Text>
        <View style={styles.btn}>
        <ButtonSubmit
         title={I18n.t("ip.ipBtn")}
         onPress={() => {
          props.onRefreshHandler()
         }}
       />
        </View>

       </View>
      </View>
    );
}
export default IpChanged;
