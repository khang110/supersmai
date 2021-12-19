import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import config from "../../config/config";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import transaction from "../../../assets/Transaction.png";
import address from "../../../assets/address.png";
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
const arrUri = [transaction];

const App = (props) => {
  // const [modalVisible, setModalVisible] = useState(false);
  const { navigation, data } = props;
 
  const [arrImage, setArrImage] = useState([]);

  useEffect(() => {
    // console.log(data);
    if (data.urlImage.length == 0) {
      setArrImage(arrUri);
    } else {
      setArrImage(data.urlImage);
    }
  }, []);
  const pressGive = () => {
    if (data.TypeAuthor == "tangcongdong") {
      navigation.navigate("LetMessage", { data: data });
    } else {
      navigation.navigate("ListGive", { data: data, name: "Xác nhận đồ bạn tặng" });
    }

  }
  const renderTextButton = () => {
    if (data.TypeAuthor == "tangcongdong") {
      return " Lời nhắn"
    } else {
      return " Gửi tặng"
    }
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.top}>
              <TouchableOpacity onPress={() => props.closeModal()}>
                <AntDesign
                  name="close"
                  size={config.screen_width * 0.05}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.tittleText}>Địa chỉ của bạn</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View>
                <SliderBox
                  images={arrImage}
                  resizeMethod={"resize"}
                  resizeMode={"cover"}
                  autoplay
                  ImageComponentStyle={{ width: "100%" }}
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
                    <Image source={address} style={styles.iconAddress} />
                    <Text
                      style={[
                        styles.cate,
                        { marginTop: "2%", marginLeft: "2%" },
                      ]}
                      numberOfLines={2}
                    >
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
             
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

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
  top: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    borderColor: "#E0E0E0",
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: '1%',
    paddingBottom: '1%',
    alignItems: 'center'
  },
  tittleText: {
    fontSize: fontSize.fontsize_2,
    marginLeft: "5%",
    fontWeight: 'bold'
  },
});

export default App;
