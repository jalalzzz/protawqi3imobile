import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

function Spacer(props) {
  const { size, horizontal, backgroundColor } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? "width" : "height"]: size ?? 10,
          backgroundColor,
        },
      }),
    [backgroundColor, horizontal, size]
  );

  return <View style={styles.spacerStyle} />;
}

export default Spacer;
