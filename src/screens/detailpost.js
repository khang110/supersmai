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
import transaction from '../../assets/Transaction.png';
import address from '../../assets/address.png';
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";
import axios from "axios";
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
const arrUri = [transaction];

function DetailPost(props) {
  const { navigation } = props;
  let data = props.route.params.data;
  const [arrImage, setArrImage] = useState([]);

  useEffect(() => {
    if (data.urlImage.length == 0) {
      setArrImage(arrUri);
    } else {
      setArrImage(data.urlImage);
    }
   
    const checkTokenLocal = async () => {
      console.log(data._id)
      let url = "https://app-super-smai.herokuapp.com/user/updateHistory?idPost="+data._id;
      if (token) {
       
          axios({
            method: "put",
            url: url,
            headers: {
              Authorization: "bearer" + props.auth.token,
            },
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        console.log("no token");
      }
      checkTokenLocal()
    };
  }, []);
  useEffect(() => {
    //kiem tra dang nhap tren thiet bi
    const checkTokenLocal = async () => {
      let token = await 'bearer ' + props.auth.token;
      if (token) {
        axios
          .put(
            "https://app-super-smai.herokuapp.com/user/updateHistory",
            { IdPost: [data._id] },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            alert(error.message);
          });
      } else {
        return await null;
      }
    };
    checkTokenLocal();
    //Lay ra so dien thoai nguoi dang bai
    const getPhone = async (AuthorID) => {
      try {
        await axios({
          method: "get",
          url:
            "https://api.smai.com.vn/user/getInfoAuthor?AuthorID=" + AuthorID,
        }).then(async (data) => {
          setPhoneNumber(data.data.PhoneNumber);
          setAvatar(data.data.ImgAuthor);
          setLoading(false);
        });
      } catch (e) {
        alert(e);
      }
    };
    // getPhone(data.AuthorID);
    //Lay ra avatar
  }, []);
  const pressGive = () => {
    if (props.auth.isLogin == true) {
      if (data.TypeAuthor == "tangcongdong") {
        navigation.navigate("LetMessage", { data: data });
      } else {
        navigation.navigate("ListGive", { data: data, name: "Xác nhận đồ bạn tặng" });
      }
    } else {
      navigation.navigate("Authentication");
    }

  }
  const renderTextButton = () => {
    if (data.TypeAuthor == "tangcongdong") {
      return " Lời nhắn"
    } else {
      return " Gửi tặng"
    }
  }
  const renderButtonBottom = () => {
    if (data.NameAuthor == props.auth.FullName) return;
    else {
      return (
        <View style={styles.wrapButtonBottom}>
          <TouchableOpacity style={{ padding: "4%" }}>
            <Text style={styles.textBad}>Báo xấu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wrapButtonMessage} onPress={pressGive}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={config.screen_width * 0.06}
              color="#FFF"
            />
            <Text style={styles.textGive}>{renderTextButton()}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <SliderBox
          images={arrImage}
          resizeMethod={"resize"}
          resizeMode={"cover"}
          autoplay
          ImageComponentStyle={{width: "100%"}}
          circleLoop
          sliderBoxHeight={config.screen_width * 0.8}
          imageLoadingColor="#FFF"
        />
        <View style={styles.wrapMidle}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.wrapCate}>
            <Text style={styles.cate}>Quần áo bé nam</Text>
            <Text style={styles.price}>Miễn phí</Text>
          </View>
          <View style={styles.wrapAddress}>
            <Image source={address} style={styles.iconAddress}/>
            <Text style={[styles.cate, { marginTop: "2%", marginLeft: '2%' }]} numberOfLines={2}>
              {data.address}
            </Text>
          </View>
          <View style={styles.wrapInfor}>
            <Avatar
              size={config.screen_width * 0.1}
              source={{ uri: avata }}
              avatarStyle={{ borderRadius: 20 }}
            />
            <View style={styles.wrapName}>
              <Text style={styles.name}>{data.NameAuthor}</Text>
              <Text style={styles.cate}>Cá nhân</Text>
            </View>
          </View>
          <Text style={styles.descript}>{data.note}</Text>
        </View>
      </View>
      {renderButtonBottom()}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: '#FFF'
  },
  containter: { flex: 1, justifyContent: "center", alignItems: "center" },
  wrapMidle: { marginTop: "2%" },
  title: { fontSize: fontSize.fontsize_2 ,  marginLeft: "4%", marginRight: "4%",},
  wrapCate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "4%", marginRight: "4%",

  },
  cate: { fontSize: fontSize.fontsize_4, color: color.gray_3, maxWidth: "90%" },
  price: { color: color.green, fontSize: fontSize.fontsize_4 },
  wrapAddress:{ flexDirection: "row",  paddingLeft: "4%", paddingRight: "4%",
  borderColor: '#EEEEEE',
  alignItems: 'center',
  borderTopWidth: 4, },
  iconAddress: {
    width: config.screen_width * 0.06,
    height: config.screen_width * 0.06,
  },
  wrapInfor: { flexDirection: "row", marginTop: "1%", marginBottom: "1%" ,
  borderColor: '#EEEEEE',
  borderBottomWidth: 4,
  borderTopWidth: 4,
  paddingTop: '1%',
  paddingBottom: '1%',
  alignItems: 'center',
  paddingLeft: '4%',
  paddingRight: '4%'
},
  wrapName: {
    marginLeft: "4%",
    marginBottom: "2%",
    width: "80%",
  },
  name: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  descript: { fontSize: fontSize.fontsize_3 ,  marginLeft: "4%", marginRight: "4%",},
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
})(DetailPost);
