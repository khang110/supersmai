import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import fontSize from "../../config/fontsize";
var { width } = Dimensions.get("window");
function MyComponent(props) {
  const statusItem = () => {
    if (props.active) {
      return (
        <TouchableOpacity
          style={styles.chipOutLineActive}
          onPress={() => props.onPress()}
        >
          <View style={styles.triangleCorner} />

          <Text style={styles.textChipActive}>{props.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.chipOutLineNoActive}
          onPress={() => props.onPress()}
        >
          <Text style={styles.textChipNoActive}>{props.title}</Text>
        </TouchableOpacity>
      );
    }
  };
  return <View>{statusItem()}</View>;
}
const styles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: width * 0.035,
    borderTopWidth: width * 0.035,
    borderTopLeftRadius: 8,
    position: "absolute",
    top: -1,
    left: -1,
    borderRightColor: "transparent",
    borderTopColor: "#EF1A26",
  },
  chipOutLineActive: {
    borderWidth: 1,
    borderColor: "#EF1A26",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginRight: width * 0.02,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.02,
  },
  chipOutLineNoActive: {
    borderWidth: 1,
    borderColor: "#BDBDBDBD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginRight: width * 0.02,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.02,
  },
  textChipActive: {
    fontSize: fontSize.fontsize_5,
    color: "#000",
  },
  textChipNoActive: {
    fontSize: fontSize.fontsize_5,
    color: "#BDBDBD",
  },
});
export default MyComponent;
