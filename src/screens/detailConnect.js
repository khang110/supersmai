import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import config from "../config/config";
import fontSize from "../config/fontsize";
import color from "../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import address from "../../assets/address.png";
import Chip from '../components/Chips/chipStatus';
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
function DetailConnect(props) {
  return (
    <ScrollView>
      <Text>Người nhận</Text>
      <View style={styles.wrapInfor}>
        <Avatar
          size={config.screen_width * 0.1}
          source={{ uri: avata }}
          avatarStyle={{ borderRadius: 20 }}
        />
        <View style={styles.wrapName}>
          <Text style={styles.name}>Nguyễn Tử Quảng</Text>
          <Text style={styles.cate}>Cá nhân</Text>
        </View>
      </View>
      <View style={styles.wrapAddress}>
        <Image source={address} style={styles.iconAddress} />
        <Text
          style={[styles.cate, { marginTop: "2%", marginLeft: "2%" }]}
          numberOfLines={2}
        >
          Bà Rịa Vũng Tàu
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Thông tin tặng</Text>
          <Chip/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapInfor: {
    flexDirection: "row",
    marginTop: "1%",
    borderColor: "#EEEEEE",
    borderBottomWidth: 2,
    paddingTop: "1%",
    paddingBottom: "1%",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  wrapName: {
    marginLeft: "4%",
    marginBottom: "2%",
    width: "80%",
  },
  name: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  cate: { fontSize: fontSize.fontsize_4, color: color.gray_3, maxWidth: "90%" },
  wrapAddress: {
    flexDirection: "row",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderColor: "#EEEEEE",
    alignItems: "center",
    paddingTop: '2%',
    paddingBottom: '2%',
    borderBottomWidth: 2,
  },
  iconAddress: {
    width: config.screen_width * 0.06,
    height: config.screen_width * 0.06,
  },
});

export default DetailConnect;
