import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Modal } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import config from '../../config/config';
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons,AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import transaction from '../../../assets/Transaction.png';
import address from '../../../assets/address.png';
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
const arrUri = [transaction];

function DetailPost(props) {
  const { navigation, data,visible, closeModal } = props;
 
  const [arrImage, setArrImage] = useState([]);

  useEffect(() => {
    // console.log(data);
    if (data.urlImage.length == 0) {
      setArrImage(arrUri);
    } else {
      setArrImage(data.urlImage);
    }
  }, []);

  return (
      <Modal visible={visible}>
      
    <ScrollView contentContainerStyle={styles.contentContainer}>
        
      <View>
      <View style={styles.top}>
          <TouchableOpacity onPress={closeModal} style={{zIndex: 10000, overflow: 'hidden'}}>
            <AntDesign
              name="close"
              size={config.screen_width * 0.06}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Chi tiết tin đăng</Text>
 
        </View>
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
      <TouchableOpacity onPress={closeModal}>
            <AntDesign
              name="close"
              size={config.screen_width * 0.06}
              color="black"
            />
          </TouchableOpacity>
    </ScrollView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
   flex: 1,
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
    borderWidth: 5,
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "2%",
   zIndex: 1000
  },
  titleText: {
    fontSize: fontSize.fontsize_2,
    color: "#000",
    fontWeight: 'bold',
    marginLeft: '5%'
  }
});
export default DetailPost;
