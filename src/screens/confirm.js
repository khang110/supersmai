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
import { Ionicons, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import color from "../config/color";
import fontSize from "../config/fontsize";
import config from "../config/config";
import ButtonConfirm from "../components/button/buttonConfirm";
import ListImage from '../components/pickImage/ListImage';
import { connect } from 'react-redux';
const Title = (props) => {
  return (
    <View style={styles.wrapTitle}>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};

function Confirm(props) {
  const [textTitle, setTextTitle] = useState("");
  const [textDescrip, setTextDescrip] = useState("");
  const { navigation, dispatch } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonCancel
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      ),
    });
  }, [navigation]);
  const removeImage = (index) => {
    let listImage = props.infoPost.image;
    listImage.splice(index, 1);
    dispatch({ type: "GET_IMG", image: listImage });
  };

  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: img.uri }} style={styles.imgUpload} />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={{ position: "absolute", right: -5, top: -5 }}
            >
              <AntDesign
                name="closecircle"
                size={config.screen_width * 0.05}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Title title="Thông tin liên hệ" />
        <View style={styles.wrapInfor}>
          <Text style={styles.nameAuthor}>Nguyễn Anh Khang</Text>
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
            multiline
            maxLength={50}
            placeholder="Viết tiêu đề hoặc lời nhắn"
          />
          <Text style={styles.titleAddress}>Lời nhắn hoặc mô tả</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextDescrip(text)}
            value={textDescrip}
            multiline
            maxLength={200}
            placeholder="Viết tình trạng đồ, ghi chú,..."
          />
          <Text style={styles.titleAddress}>Hình ảnh (tối đa 5 hình ảnh)</Text>
          <ListImage navigation={navigation} dispatch={dispatch}/>
        </View>
      </View>
      <View style={styles.wrapInfor}>
        <ButtonConfirm title="Đăng tin" />
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
    fontSize: fontSize.fontsize_3,
    borderWidth: 1,
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    borderRadius: 20,
    color: color.black,
    marginTop: "2%",
    marginBottom: "2%",
    backgroundColor: color.white,
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(Confirm);