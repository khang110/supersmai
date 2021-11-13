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
import ButtonCancel from "../components/button/buttonCancel";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import fontSize from "../config/fontsize";
import config from "../config/config";
import ButtonConfirm from "../components/button/buttonConfirm";
import ListImage from "../components/pickImage/ListImage";
import { connect } from "react-redux";
import DetailAddress from "../components/Modal/DetailAddress";
import * as SecureStore from "expo-secure-store";

function LetMessage(props) {
  const [textTitle, setTextTitle] = useState("");
  const [textDescrip, setTextDescrip] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const { navigation, dispatch } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonCancel
          onPress={() => {
            dispatch({ type: "RESET" });
            navigation.navigate("Home");
          }}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "RESET" });
            navigation.goBack();
          }}
          style={{ marginLeft: "10%" }}
        >
          <Entypo name="chevron-thin-left" size={25} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      let addressDetail = await SecureStore.getItemAsync("detailAddress");
      return {
        addressDetail: addressDetail,
      };
    };
    getAddress().then((result) => {
      if (result) {
        setAddress(result.addressDetail);
      }
    });
  }, [props.infoPost.address]);
  const changeAddr = () => {
    setShowModalAddress(true);
  };
  const closeAddr = () => {
    setShowModalAddress(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <View style={styles.wrapInfor}>
          <Text style={{ fontSize: fontSize.fontsize_3, fontWeight: "bold" }}>
            Nguyễn Anh Khang - 0971037601
          </Text>
          <View style={styles.wrapAddress}>
            <Text style={styles.titleAddress}>Địa chỉ: </Text>
            <Text style={styles.address} numberOfLines={2}>
              {address == null ? "Nhập địa chỉ" : address}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={changeAddr}>
              <Text style={styles.changeAdd}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: "#FFF", height: "2%" }} />
        <View style={styles.wrapInfor}>
          <Text style={styles.titleAddress}>Lời nhắn hoặc mô tả*</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextDescrip(text)}
            value={textDescrip}
            multiline
            maxLength={200}
            placeholder="Viết lời nhắn"
          />
          <Text style={styles.titleAddress}>Hình ảnh (tối đa 5 hình ảnh)</Text>
          <ListImage navigation={navigation} dispatch={dispatch} />
        </View>
        <DetailAddress modalVisible={showModalAddress} closeModal={closeAddr} />
      </View>
      <View style={styles.wrapInfor}>
        <ButtonConfirm title="Gửi" />
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

  titleAddress: { fontSize: fontSize.fontsize_4, color: color.gray_2 },
  wrapAddress: { flexDirection: "row", marginTop: "1%" },
  titleAddress: { fontSize: fontSize.fontsize_4, color: color.gray_2 },
  address: { fontSize: fontSize.fontsize_4, maxWidth: "90%" },
  changeAdd: {
    color: "#26c6da",
    fontSize: fontSize.fontsize_4,
  },
  textCongDong: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  wrapWarning: {
    flexDirection: "row",
    marginTop: "2%",
    alignItems: "center",
  },
  titleInput: {
    borderColor: color.gray_1,
    fontSize: fontSize.fontsize_3,
    borderWidth: 1,
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 20,
    color: color.black,
    marginTop: "2%",
    marginBottom: "2%",
    backgroundColor: color.white,
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(LetMessage);
