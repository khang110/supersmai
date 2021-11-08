import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import config from "../config/config";
import fontSize from "../config/fontsize";
import color from "../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const uriAva = "https://cdn-icons.flaticon.com/png/512/4194/premium/4194687.png?token=exp=1636281332~hmac=1390cb356a0fb98c5472c6407cfa2d6a";
const avata = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
const arrUri=[uriAva]
const iconLocation = "https://cdn-icons.flaticon.com/png/512/4942/premium/4942069.png?token=exp=1636257580~hmac=ba5c9594fc4574ec68e534095cb0cfb1";
function DetailPost(props) {
  let data = props.route.params.data;
  const [arrImage, setArrImage] = useState([]);

  useEffect(() => {
    if (data.urlImage.length == 0) {
      setArrImage(arrUri);
    } else {
      setArrImage(data.urlImage)
    }
  },[])

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
      <SliderBox
        images={arrImage}
        resizeMethod={"resize"}
        resizeMode={"cover"}
        autoplay
        ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
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
        <View style={{flexDirection: 'row', }}>
        <Image source={{uri: iconLocation}} style={{width: config.screen_width*0.08, height: config.screen_width*0.08}}/>
        <Text style={[styles.cate, {marginTop: "2%"}]} numberOfLines={2}>{" "}{data.address}</Text>
        </View>
        <View style={styles.wrapInfor}>
          <Avatar
            size={config.screen_width * 0.1}
            source={{ uri: avata,}}
            avatarStyle={{ borderRadius: 20, }}
          />
          <View style={styles.wrapName}>
              <Text style={styles.name}>{data.NameAuthor}</Text>
              <Text style={styles.cate}>Cá nhân</Text>
          </View>
        </View>
        <Text style={styles.descript}>{data.note}</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: '2%', }}>
        <TouchableOpacity style={{padding: '4%'}}>
          <Text style={{fontSize: fontSize.fontsize_3, color: color.red}}>Báo xấu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', padding: '4%', justifyContent: 'center',
         backgroundColor: color.main_color, borderRadius: 30, alignItems: 'center'}}>
        <Ionicons name="chatbubble-ellipses-outline" size={config.screen_width*0.06} color="#FFF" />
          <Text style={{color: '#FFF', fontSize: fontSize.fontsize_2}}>{" "}Lời nhắn</Text>
        </TouchableOpacity>
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
  containter: { flex: 1, justifyContent: "center", alignItems: "center" },
  wrapMidle: {marginLeft: "2%", marginRight: '2%', marginTop: '2%'},
  title: { fontSize: fontSize.fontsize_2 },
  wrapCate: { flexDirection: "row", justifyContent: "space-between", marginTop: '1%', marginBottom: '1%' },
  cate: { fontSize: fontSize.fontsize_4, color: color.gray_3, maxWidth: '90%'},
  price: { color: color.green, fontSize: fontSize.fontsize_4 },
  wrapInfor: {flexDirection: 'row', marginTop: '1%', marginBottom: '1%'},
  wrapName: {marginLeft: '4%', marginBottom: '2%', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#CCC', width: '80%'},
  name:{fontSize: fontSize.fontsize_4, fontWeight: 'bold'},
  descript: {fontSize: fontSize.fontsize_3},
});
export default DetailPost;
