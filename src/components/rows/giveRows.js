import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import config from "../../config/config";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import calRealTime from '../../Helper/calRealTime';
import formatAddress from '../../Helper/formatAddress';
const uriImage =
  "https://vsbg.info/wp-content/uploads/2020/12/z2205843150842_c7be3f943eab3edc6f7907a16fcee852.jpg";
const link =
  "https://images.pexels.com/photos/4226100/pexels-photo-4226100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
const News = (props) => {
  const { data, onPress } = props;
  useEffect(() => {
    // console.log(data)
  }, []);

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <Image style={styles.imageStyle} resizeMode="center" source={{ uri: data.urlImage[0] }} />
      );
    } else {
      return ;
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => onPress()}>
        <View style={styles.wrapInfor}>
          <Avatar
            size={config.screen_width * 0.1}
            source={{ uri: link }}
            avatarStyle={{ borderRadius: 20 }}
          />
          <View style={styles.wrapName}>
            <Text style={styles.name}>{data.NameAuthor}</Text>
            <Text style={styles.cate}>🕑 {calRealTime.CalRealTime(data.createdAt)}</Text>
          </View>
        </View>
        <Text style={{color: color.black, fontSize: fontSize.fontsize_5}} numberOfLines={2}>{data.title}</Text>
        <View style={{marginTop: '1%', marginBottom: '1%',}}>
          {renderImage()}
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center', }}>
          <MaterialIcons name="location-city" size={config.screen_width*0.06} color={color.gray} />
          <Text style={styles.time}>{"  "}{formatAddress.formatAddress(data.address)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    marginLeft: "4%",
    marginRight: "4%",
    padding: '2%'
  },
  wrapInfor: { flexDirection: "row", marginTop: "1%", marginBottom: "1%" },
  wrapName: { marginLeft: "4%", width: "80%" },
  name: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  cate: { fontSize: fontSize.fontsize_5, color: color.gray_3, maxWidth: "90%" },
  time: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
  imageStyle: {
    width: config.screen_width * 0.9,
    height: config.screen_width * 0.4,
  },
});

export default News;
