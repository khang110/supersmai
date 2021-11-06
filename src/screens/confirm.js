import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import fontSize from "../config/fontsize";
import config from "../config/config";
import ButtonConfirm from "../components/button/buttonConfirm";
const Title = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.wrapTitle}>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};

function Confirm(props) {
  const [textTitle, setTextTitle] = useState("");
  const [textDescrip, setTextDescrip] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Title title="Thông tin liên hệ" />
        <View style={styles.wrapInfor}>
          <Text style={styles.nameAuthor}>Nguyễn Thị Quỳnh Nga</Text>
          <View style={styles.wrapAddress}>
            <Text style={styles.titleAddress}>Địa chỉ: </Text>
            <Text style={styles.address} numberOfLines={2}>
              210/2 Hoàng Diệu 2, Linh Chiểu, Thủ Đức, Hồ Chí Minh
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Text style={styles.changeAdd}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleAddress}>Đồ tặng: </Text>
            <Text style={styles.textCategory}>Quần áo trẻ em nam</Text>
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>Bên nhận </Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
          <Text style={styles.textCongDong}>Cộng đồng</Text>
          <View style={styles.wrapWarning}>
            <Feather
              name="info"
              size={config.screen_width * 0.04}
              color="#4CAF50"
            />
            <Text style={styles.textNote}>
              {" "}
              Cộng đồng ai cần sẽ liên hệ với bạn
            </Text>
          </View>
        </View>
        <Title title="Thông tin mô tả" />
        <View style={styles.wrapInfor}>
          <Text style={styles.titleAddress}>Tiêu đề*</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextTitle(text)}
            value={textTitle}
            maxLength={50}
            placeholder="Viết tiêu đề hoặc lời nhắn"
          />
          <Text style={styles.titleAddress}>Lời nhắn hoặc mô tả</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextDescrip(text)}
            value={textDescrip}
            multiline
            numberOfLines={4}
            placeholder="Viết tình trạng đồ, ghi chú,..."
          />
          <Text style={styles.titleAddress}>Hình ảnh (tối đa 5 hình ảnh)</Text>
          <TouchableOpacity style={styles.borderUpload}>
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={config.screen_width * 0.1}
              color="#B1B1B1"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapInfor}>
        <ButtonConfirm tittle="Đăng tin" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  wrapTitle: {
    backgroundColor: color.gray_4,
    paddingLeft: "4%",
    paddingBottom: "2%",
    paddingTop: "2%",
  },
  textTitle: {
    fontSize: fontSize.fontsize_3,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: color.gray_2,
  },
  wrapInfor: {
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  nameAuthor: { fontWeight: "bold", fontSize: fontSize.fontsize_3 },
  wrapAddress: { flexDirection: "row", marginTop: "1%" },
  titleAddress: { fontSize: fontSize.fontsize_4, color: color.gray_2 },
  address: { fontSize: fontSize.fontsize_4, maxWidth: "90%" },
  changeAdd: {
    color: "#26c6da",
    fontSize: fontSize.fontsize_4,
  },
  textCategory: {
    fontSize: fontSize.fontsize_4,
    color: color.black,
    textDecorationLine: "underline",
  },
  wrapTypeWho: { flexDirection: "row", alignItems: "center", marginTop: "2%" },
  textWho: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.fontsize_3,
    color: "#BDBDBD",
  },
  lineBetween: { flex: 1, height: 1, backgroundColor: "#BDBDBD" },
  textCongDong: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  wrapWarning: {
    flexDirection: "row",
    marginTop: "2%",
    alignItems: "center",
  },
  titleInput: {
    borderColor: color.gray_1,
    fontSize: fontSize.fontsize_4,
    borderWidth: 1,
    padding: "2%",
    borderRadius: 5,
    color: color.black,
    marginTop: "2%",
    marginBottom: "2%",
  },
  borderUpload: {
    width: config.screen_width * 0.2,
    height: config.screen_width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#B1B1B1",
    borderWidth: 2,
    backgroundColor: "#FFF",
    marginTop: "1%",
  },
});
export default Confirm;
