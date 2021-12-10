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
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import color from "../config/color";
import fontSize from "../config/fontsize";
import config from "../config/config";
import ButtonConfirm from "../components/button/buttonConfirm";
import ListImage from "../components/pickImage/ListImage";
import InforGive from "../components/confirm/inforGive";
import { connect } from "react-redux";
import DetailAddress from "../components/Modal/DetailAddress";
import { HelperText } from "react-native-paper";
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
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [errWho, setErrWho] = useState(false);
  const [errAddress, setErrAddress] = useState(false);
  const { navigation, dispatch } = props;
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

  const renderCategory = () => {
    if (props.infoPost.TypeAuthor != "tangcongdong") {
      return (
        <View style={styles.wrapCategory}>
          <Text>Danh mục nhận tặng: {props.infoPost.NameProduct.length}</Text>
          <TouchableOpacity>
            <Text style={{ color: "#26c6da", fontSize: fontSize.fontsize_4 }}>
              Chi tiết
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const dangtin = () => {
    if (textTitle == "") {
      setErrTitle(true)
    } else {
      setErrTitle(false);
    }
    if (props.infoPost.TypeAuthor == "") {
      setErrWho(true)
    } else {
      setErrWho(false);
    }
    if (address == "") {
      setErrAddress(true)
    } else {
      setErrAddress(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Title title="Thông tin liên hệ" />
        <View style={styles.wrapInfor}>
          <InforGive
            category={props.infoPost.NameProduct[0].NameProduct}
            dispatch={dispatch}
            onPress={() => setShowModalAddress(true)}
            errWho={errWho} errAddress={errAddress}
          />
          {renderCategory()}
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
          {errTitle ? (<HelperText type="error" visible={errTitle}>
            Nhập tiêu đề
          </HelperText>) : (<></>)}
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
          <ListImage navigation={navigation} dispatch={dispatch} />
        </View>
      </View>
      <DetailAddress
        modalVisible={showModalAddress}
        closeModal={() => setShowModalAddress(false)}
      />
      <View style={styles.wrapInfor}>
        <ButtonConfirm title="Đăng tin" onPress={dangtin} />
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

  textCongDong: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  wrapWarning: {
    flexDirection: "row",
    marginTop: "2%",
    alignItems: "center",
  },
  wrapCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
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
})(Confirm);
