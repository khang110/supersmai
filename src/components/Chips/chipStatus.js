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
import color from '../../config/color';
var { width } = Dimensions.get("window");
function ChipStatus(props) {
    const background1= {backgroundColor: 'green'}
    const background2 = {backgroundColor: '#F5F5F5'}
    const background3 = {backgroundColor: 'red'}
    const textColor1 = {color: '#FFF'}
    const textColor2 = {color: '#000'}

    const renderStaus = () => {
      if (props.status == "waiting") {
        return (
          <View style={styles.wrapStatus}>
            <Text style={styles.textStatus}>{props.typetransaction}</Text>
          </View>
        );
      }
      if (props.status == "done") {
        return (
          <View style={styles.wrapStatusDone}>
            <Text style={styles.textStatusDone}>{props.typetransaction}</Text>
          </View>
        );
      }
      if (props.status == "cancel") {
        return (
          <View style={styles.wrapStatusCancel}>
            <Text style={styles.textStatusDone}>{props.typetransaction}</Text>
          </View>
        );
      }
    };
  return (
   <>{renderStaus()}</>
  );
}
const styles = StyleSheet.create({
  wrapStatus: {
    backgroundColor: color.gray,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
  textStatus: {
    fontWeight: "bold",
    color: color.black,
  },
  wrapStatusDone: {
    backgroundColor: color.green,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
  textStatusDone: {
    fontWeight: "bold",
    color: color.white,
  },
  wrapStatusCancel: {
    backgroundColor: color.red_1,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
});
export default ChipStatus;
