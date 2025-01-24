import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import I18n from "@i18n";
import styles from "./styles";

const AttachmentNote = (props) => {
  return (
    <>
      {props.notes ? (
        // <ScrollView style={{ height: 400 }}>

        <FlatList
          style={{ height: 700 }}
          data={props.notes}
          renderItem={({ item, index }) => (
            <>
              <View
                style={{
                  width: "120%",
                  flexDirection: "row",
                  marginVertical: 15,
                }}
              >
                <Text
                  style={{
                    width: "10%",
                    // marginHorizontal: -20,
                  }}
                >
                  -{index + 1}
                </Text>
                <Text
                  style={{
                    width: 350,
                    textAlign: "left",
                    marginHorizontal: 30,
                    fontFamily: "DINNextLTArabic-Regular",
                  }}
                >
                  {item.Note}
                </Text>
              </View>
              <View
                style={{
                  textAlign: "right",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#999999",
                    fontFamily: "DINNextLTArabic-Regular",
                  }}
                >
                  {I18n.t("DOC_SIGN.By")} {item.UserFullName}
                  {" - "}
                  {item.CreatedDate}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: "#0877D0",
                  borderBottomWidth: ++index !== props.notes?.length ? 0.5 : 0,
                }}
              />
            </>
          )}
        />
      ) : (
        <View>
          <Text style={styles.emptyNotesText}>
            {I18n.t("DOC_SIGN.nonNotes")}
          </Text>
        </View>
      )}
    </>
  );
};

export default AttachmentNote;
