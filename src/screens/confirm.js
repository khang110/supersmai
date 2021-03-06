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
import ModalSuccess from '../components/Modal/ModalSuccess';
import DetailAddress from "../components/Modal/DetailAddress";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { HelperText } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";
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
  const [loading, setLoading] = useState(false);
  const [modalsuccess, setModalsuccess] = useState(false);
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
          <Text>Danh m???c nh???n t???ng: {props.infoPost.NameProduct.length}</Text>
          <TouchableOpacity>
            <Text style={{ color: "#26c6da", fontSize: fontSize.fontsize_4 }}>
              Chi ti???t
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
          <Text style={styles.textCongDong}>C???ng ?????ng</Text>
          <View style={styles.wrapWarning}>
            <Feather
              name="info"
              size={config.screen_width * 0.04}
              color="#4CAF50"
            />
            <Text style={styles.textNote}>
              {" "}
              C???ng ?????ng ai c???n s??? li??n h??? v???i b???n
            </Text>
          </View>
        </>
      );
    }
  };
  const closeSuccess = () => {
    setModalsuccess(false)
    navigation.navigate("Home")
  }
  const submitInfoPost = async () => {
    setLoading(true);
    //api upload infor json
    const token = "bearer " + props.auth.token;
    const data = props.infoPost;

    axios({
      url: "https://app-super-smai.herokuapp.com/post/CreatePost",
      method: "post",
      data: {
        title: textTitle,
        note: textDescrip,
        address: address,
        TypeAuthor: data.TypeAuthor,
        NameProduct: data.NameProduct,
      },
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        //sau khi upload json xong thi tien hanh upload hinh anh su dung idpost duoc tra ve
        if (props.infoPost.image[0]) {
          const image = props.infoPost.image;
          let apiUrl = "https://app-super-smai.herokuapp.com/post/UpdatePost";
          let formData = new FormData();
          for (let i = 0; i < image.length; i++) {
            let uri = image[i].uri;
            let uriArray = uri.split(".");
            let fileType = uriArray[uriArray.length - 1];
            formData.append("productImage", {
              uri: uri,
              name: `photo.${fileType}`,
              type: `image/${fileType}`,
            });
          }
          let options = {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {
              idpost: res.data.idpost,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          };
          fetch(apiUrl, options).then((res) => {
            setLoading(false)
            setModalsuccess(true)
          });
        } else {
          setLoading(false)
          setModalsuccess(true)
          
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)});
  };

  const dangtin = () => {
    if (textTitle == "") {
      setErrTitle(true)
    } else {
      setErrTitle(false);
    }
    if (props.infoPost.TypeAuthor == "") {
      console.log("tpeaa")
      setErrWho(true)
    } else {
      setErrWho(false);
    }
    if (address == null) {
      setErrAddress(true)
    } else {
      setErrAddress(false);
    }
    if (textTitle != "" && address != null && props.infoPost.TypeAuthor != "") {
      submitInfoPost()
      // Dialog.show({
      //   type: ALERT_TYPE.SUCCESS,
      //   // closeOnOverlayTap: false,
      //   title: '????ng tin th??nh c??ng',
      //   textBody:'C???m ??n l??ng h???o t??m c???a b???n',
      //   button:'Xong'
      // })
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Root>
      <View>
        <Title title="Th??ng tin li??n h???" />
        <View style={styles.wrapInfor}>
          <InforGive
            category={props.infoPost.NameProduct[0].NameProduct}
            dispatch={dispatch}
            onPress={() => setShowModalAddress(true)}
            errWho={errWho} errAddress={errAddress}
          />
          {renderCategory()}
        </View>
        <Title title="Th??ng tin m?? t???" />
        <View style={styles.wrapInfor}>
          <Text style={styles.titleAddress}>Ti??u ?????*</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextTitle(text)}
            value={textTitle}
            multiline
            maxLength={50}
            placeholder="Vi???t ti??u ????? ho???c l???i nh???n"
          />
          {errTitle ? (<HelperText type="error" visible={errTitle}>
            Nh???p ti??u ?????
          </HelperText>) : (<></>)}
          <Text style={styles.titleAddress}>L???i nh???n ho???c m?? t???</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTextDescrip(text)}
            value={textDescrip}
            multiline
            maxLength={200}
            placeholder="Vi???t t??nh tr???ng ?????, ghi ch??,..."
          />
          <Text style={styles.titleAddress}>H??nh ???nh (t???i ??a 5 h??nh ???nh)</Text>
          <ListImage navigation={navigation} dispatch={dispatch} />
        </View>
        <ModalSuccess modalVisible={modalsuccess} closeModal={closeSuccess}
        description="C???m ??n b???n!" title="????ng tin th??nh c??ng"/>
      </View>
      </Root>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../loading/loading2.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>??ang ????ng tin...</Text>
      </AnimatedLoader>
     
      <DetailAddress
        modalVisible={showModalAddress}
        closeModal={() => setShowModalAddress(false)}
      />
      <View style={styles.wrapInfor}>
        <ButtonConfirm title="????ng tin" onPress={dangtin} />
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
  lottie: {
    width: 100,
    height: 100
  }
});
export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth };
})(Confirm);
