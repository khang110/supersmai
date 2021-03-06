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
import color from "../config/color";
import fontSize from "../config/fontsize";
import config from "../config/config";
import ButtonConfirm from "../components/button/buttonConfirm";
import ListImage from "../components/pickImage/ListImage";
import { connect } from "react-redux";
import DetailAddress from "../components/Modal/DetailAddress";
import { HelperText } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import ModalSuccess from '../components/Modal/ModalSuccess';
import Spinner from 'react-native-loading-spinner-overlay';
const Title = (props) => {
  return (
    <View style={styles.wrapTitle}>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};
function LetMessage(props) {
  const [textTitle, setTextTitle] = useState("");
  const [textDescrip, setTextDescrip] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [visibleSuccess, setvisibleSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [errDescript, setErrDescript] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { navigation, dispatch } = props;
  let data = props.route.params.data;
  let category = props.route.params.cateSelected;
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
  const pressGive = () => {
    if (textDescrip == "") {
      setErrDescript(true);
    } else {
      setErrDescript(false);
      submitInfoPost();
    }
  };
  const closeSuccess = () => {
    setvisibleSuccess(false)
    if (data.TypeAuthor == "C?? nh??n") {
      navigation.navigate("GiveGroups", { typeAuthor: "canhan" });
    }
    if (data.TypeAuthor == "T??? ch???c c??ng ??ch") {
      navigation.navigate("GiveGroups", { typeAuthor: "tochuc" });
    }
    if (data.TypeAuthor == "Qu???/Nh??m t??? thi???n") {
      navigation.navigate("GiveGroups", { typeAuthor: "quy" });
    }
  }

  const submitInfoPost = async () => {
      setIsloading(true)
      let apiUrl = "https://app-super-smai.herokuapp.com/transaction/create-transaction";
      let formData = new FormData();
      //sau khi upload json xong thi tien hanh upload hinh anh su dung idpost duoc tra ve
      if (props.infoPost.image[0]) {
        let listImage = props.infoPost.image;
        for (let i = 0; i < listImage.length; i++) {
          let uri = listImage[i].uri;
          let uriArray = uri.split(".");
          let fileType = uriArray[uriArray.length - 1];
          formData.append("productImage", {
            uri: uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        }
      }
      formData.append("note", textDescrip);
      formData.append("postID", data._id);
      formData.append("status", "waiting");

      formData.append("senderAddress", address);
      let options = {
        method: "POST",
        body: formData,
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + props.auth.token,
        },
      };
      fetch(apiUrl, options)
        .then((res) => {
         
          setIsloading(false)
          setvisibleSuccess(true);
        })
        .catch((err) => {
          console.log(err.response);
        });
    
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Title title="Th??ng tin li??n h???" />
        <View style={styles.wrapInfor}>
          <Text style={{ fontSize: fontSize.fontsize_3, fontWeight: "bold" }}>
            {props.auth.FullName + " - "  + props.auth.PhoneNumber }
          </Text>
          <View style={styles.wrapAddress}>
            <Text style={styles.titleAddress}>?????a ch???: </Text>
            <Text style={styles.address} numberOfLines={2}>
              {address == null ? "Nh???p ?????a ch???" : address}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={changeAddr}>
              <Text style={styles.changeAdd}>Thay ?????i</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleAddress}>????? t???ng: </Text>
            <Text style={styles.textCategory}>{category}</Text>
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>B??n nh???n </Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
          <Text style={{ fontSize: fontSize.fontsize_3, fontWeight: "bold" }}>
            {data.NameAuthor}
          </Text>
          <View style={styles.wrapAddress}>
            <Text style={styles.titleAddress}>?????a ch???: </Text>
            <Text style={styles.address} numberOfLines={2}>
              {data.address}
            </Text>
          </View>
        </View>
        <Title title="Th??ng tin m?? t???" />
        <View style={styles.wrapInfor}>
          <Text style={styles.titleAddress}>L???i nh???n ho???c m?? t???*</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextDescrip(text)}
            value={textDescrip}
            multiline
            maxLength={200}
            placeholder="Vi???t l???i nh???n"
          />
          {errDescript ? (
            <HelperText type="error" visible={errDescript}>
              Nh???p l???i nh???n
            </HelperText>
          ) : (
            <></>
          )}
          <Text style={styles.titleAddress}>H??nh ???nh (t???i ??a 5 h??nh ???nh)</Text>
          <ListImage navigation={navigation} dispatch={dispatch} />
        </View>
        <DetailAddress modalVisible={showModalAddress} closeModal={closeAddr} />
        <ModalSuccess modalVisible={visibleSuccess} closeModal={closeSuccess}
        description="Vui l??ng ch??? x??c nh???n!" title="G???i l???i nh???n th??nh c??ng!"/>
        <Spinner visible={isloading}  textContent={"??ang x??? l??..."} textStyle={styles.spinnerTextStyle}
      />
      </View>
      <View style={styles.wrapInfor} >
        <ButtonConfirm title="G???i t???ng" onPress={pressGive} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
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
  lineBetween: { flex: 1, height: 0.5, backgroundColor: "#BDBDBD" },
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
  return { infoPost: state.infoPost, auth: state.auth };
})(LetMessage);
