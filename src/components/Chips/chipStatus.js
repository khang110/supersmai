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
function ChipStatus(props) {
    const background1= {
        backgroundColor: 'green'
    }
    const textColor1 = {color: '#FFF'}
  return (
    <View style={[{
        // backgroundColor: '#BDBDBD', 
        paddingLeft: '2%', 
        paddingRight: '2%',
        borderRadius: 10}, background1]}>
      <Text style={[styles.textStatus, textColor1]}>Chưa tặng</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStatus: {
    // color: "#000",
    fontWeight: 'bold'
    
  },
});
export default ChipStatus;
