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
import { connect } from "react-redux";
import axios from "axios";
import Chip from "../components/Chips/chipStatus";
import RowDetailConnect from "../components/rows/rowDetailConnect";
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
function DetailConnect(props) {
  let data = props.route.params.data;

  const giveFor = async () => {
   console.log(data._id)
   console.log(props.auth.token)
  
    let body =  { status: "done", notefinish: "text"};
// http://localhost:5000/transaction/update-status?transactionId=616093e1c810163bf0df21f8
    await axios({
      method: "put",
      url: `https://app-super-smai.herokuapp.com/transaction/update-status?transactionId=${data._id}`,
      data: body,
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        console.log("Đã xong")
      })
      .catch((error) => {
        console.log("Error: ", error);
      
      })
  
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View>
     <View style={{ marginLeft: "4%" }}>
        <Text style={styles.title}>Người nhận</Text>
      </View>
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
      <View style={styles.wrapInforTrans}>
        <Text style={styles.title}>Thông tin tặng</Text>
        <Chip status={data.isStatus} typetransaction={data.typetransaction} />
      </View>
      <View>
        <RowDetailConnect data={data.PostData} />
      </View>
      <View style={styles.wrapNote}>
        <Text style={styles.title}>Ghi chú</Text>
        <Text style={styles.textNote}>No message</Text>
      </View>
      <View style={styles.wrapNote}>
        <Text style={styles.title}>Theo dõi</Text>
      </View>
     </View>

      <View style={styles.wrapButtonBottom}>
        <TouchableOpacity style={{ padding: "4%" }}>
          <Text style={styles.textBad}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapButtonMessage} onPress={() => giveFor()}>
          <Text style={styles.textGive}>Xác nhận xong</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: '#FFF'
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSize.fontsize_2,
    color: color.gray_2,
  },
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
    paddingTop: "2%",
    paddingBottom: "2%",
    borderBottomWidth: 2,
  },
  iconAddress: {
    width: config.screen_width * 0.06,
    height: config.screen_width * 0.06,
  },
  wrapInforTrans: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "4%",
    marginRight: "4%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  wrapNote: {
    paddingLeft: "4%",
    paddingBottom: "2%",
    borderColor: "#EEEEEE",
    paddingTop: "2%",
    borderBottomWidth: 2,
  },
  textNote: {
    fontSize: fontSize.fontsize_4,

    marginRight: "2%",
  },
  wrapButtonBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
  },
  textBad: { fontSize: fontSize.fontsize_3, color: color.red },
  textGive: { color: '#FFF', fontSize: fontSize.fontsize_2 },
  wrapButtonMessage: {
    flexDirection: "row",
    padding: "4%",
    justifyContent: "center",
    backgroundColor: color.main_color,
    borderRadius: 30,
    alignItems: "center",
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth };
})(DetailConnect);
