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
import formatTime from '../../Helper/formatTime';
import { SimpleLineIcons } from "@expo/vector-icons";
import solidarity from '../../../assets/solidarity.png';
import { connect } from "react-redux";
const uriImage =
  "https://cdn-icons.flaticon.com/png/512/4194/premium/4194687.png?token=exp=1636281332~hmac=1390cb356a0fb98c5472c6407cfa2d6a";

const NewsConnect = (props) => {
  const { data, onPress } = props;
  useEffect(() => {
    // console.log(data)
  }, []);

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <Image style={styles.imageStyle} source={{ uri: data.urlImage[0] }} />
      );
    } else {
      return <Image style={styles.imageStyle} source={solidarity} />;
    }
  };
  const renderStaus = () => {
    if (data.isStatus == "waiting") {
      return (
        <View style={styles.wrapStatus}>
          <Text style={styles.textStatus}>{data.typetransaction}</Text>
        </View>
      );
    }
    if (data.isStatus == "done") {
      return (
        <View style={styles.wrapStatusDone}>
          <Text style={styles.textStatusDone}>{data.typetransaction}</Text>
        </View>
      );
    }
    if (data.isStatus == "cancel") {
      return (
        <View style={styles.wrapStatusCancel}>
          <Text style={styles.textStatusDone}>{data.typetransaction}</Text>
        </View>
      );
    }
  };
  const renderName = () => {
    if (data.PostData.NameAuthor != props.auth.FullName) {
        return data.PostData.NameAuthor;
    }
    if (data.ReceiverUser.FullName != props.auth.FullName) {
      return data.ReceiverUser[0].FullName;
    }
    if (data.SenderUser.FullName != props.auth.FullName) {
      return data.SenderUser[0].FullName;
    }
  }

 
  return (
    <View>
      <TouchableOpacity onPress={() => onPress()} style={styles.container}>
        <View style={styles.wrapImage}>
         {renderImage()}
        </View>
        <View style={styles.wrapTitle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SimpleLineIcons name="user" size={18} color="black" />
            <Text style={styles.title} numberOfLines={1}>
              {"  "}
              {renderName()}
            </Text>
          </View>
          <Text style={styles.time} numberOfLines={1}>
            {data.PostData.title}
          </Text>
          <View style={styles.wrapAddr}>
            <Text style={styles.time}>???? {formatTime.formatTime(data.PostData.updatedAt)}</Text>
            {renderStaus()}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginLeft: "4%",
    marginRight: "4%",
  },
  wrapImage: { width: "25%" },
  imageStyle: {
    width: config.screen_width * 0.22,
    height: config.screen_width * 0.22,
    borderRadius: 20,
  },
  wrapTitle: {
    width: "75%",
    justifyContent: "space-around",
    padding: "2%",
  },
  title: { fontSize: fontSize.fontsize_3, fontWeight: "bold" },
  wrapAddr: { flexDirection: "row", justifyContent: "space-between" },
  time: { fontSize: fontSize.fontsize_5, color: color.gray_3 },
  wrapStatus: {
    backgroundColor: color.gray,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
  textStatus: {
    fontWeight: "bold",
    color: color.black,
  },
  wrapStatusDone: {
    backgroundColor: color.green,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
  textStatusDone: {
    fontWeight: "bold",
    color: color.white,
  },
  wrapStatusCancel: {
    backgroundColor: color.red_1,
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
});


export default connect(function (state) {
  return { auth: state.auth };
})(NewsConnect);