import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import config from "../../config/config";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import axios from "axios";
import { Badge } from "react-native-paper";
const { width } = Dimensions.get("window");
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";

function AnnounceComponent(props) {
  const { dispatch } = props;
  const [dataItem, setDataItem] = useState();
  const [loadingPost, setLoadingPost] = useState(false);
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()} năm trước `;
    else if (calMonth() != 0) return `${calMonth()} tháng trước `;
    else if (calDay() != 0) return `${calDay()} ngày trước `;
    else if (calHour() != 0) return `${calHour()} giờ trước `;
    else return `${calMinute()} phút trước `;
  };
  const currentTime = new Date();
  useEffect(() => {
    getTrans();
  }, []);
  const getTrans = async () => {
    
    setLoadingPost(true)
    await axios({
      method: "get",
      url:
        "https://app-super-smai.herokuapp.com/transaction/get-transactionID?transactionID=" +
        props.idTransaction,
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        setDataItem(res.data.data.data);
        // console.log(res.data.data.data);
        setLoadingPost(false)
      })
      .catch((error) => {
        console.log("Error: ", error);
        setLoadingPost(false)
      });
  };
  const updateStatus = async () => {
    let token = await SecureStore.getItemAsync("token");
    await axios({
      method: "put",
      url:
        "https://app-super-smai.herokuapp.com/push/update-notification?idNotification=" +
        props.idNotification,
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handlePress = (item) => {
    if (dataItem != null) {
      updateStatus();
      if (dataItem[0].isStatus != "null") {
      
        if (item == "Đã nhận" || item == "Chưa nhận" || item == "Hủy nhận") {
          props.navigation.navigate("DetailConnect", {
            data: dataItem[0],
          }); //chuyển trang
        } else {
          props.navigation.navigate("DetailConnect", {

            data: dataItem[0],
          }); //chuyển trang
        }
      } else {
        props.navigation.navigate("ListGiveTCD", {
          postId: dataItem[0].PostData._id,
        }); //chuyển trang
      }
    }
  };
  return (
    <>
      {loadingPost ? (
        <View style={styles.loadingCard}>
          <View style={styles.loadingTopCard}></View>
          <View style={styles.loadingBottomCard}></View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            handlePress(dataItem[0].typetransaction);
          }}
        >
          <View style={styles.topCard}>
            <View
              style={{
                flexDirection: "row",
                maxWidth: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="filetext1" size={width * 0.03} color="black" />
              <Text style={[styles.textTop, {}]}>
                {" "}
                {props.bodyNotification}
              </Text>
              <Badge
                style={
                  props.examined ? styles.badgeActive : styles.badgeNoActive
                }
                size={width * 0.02}
              ></Badge>
            </View>

            <Text style={styles.textTop}>
              {calculatingTime(props.updatedAt, currentTime)}
            </Text>
          </View>
          <Text style={styles.textTitle}>{props.titleNotification}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: fontSize.fontsize_2,

  },
  card: {
    borderRadius: 10,
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: "2%",
    backgroundColor: "#ffffff",
    elevation: 4,
  },
  cardNoActive: {
    borderRadius: 10,
    padding: "2%",
    margin: "2%",
    backgroundColor: "#CCCCCCaa",
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#DDD",
    borderBottomWidth: 0.5,
    paddingBottom: "1%",
  },
  textTop: {
    fontSize: fontSize.fontsize_3,

  },
  badgeActive: {
    backgroundColor: "green",
    position: "absolute",
    top: 7,
    right: -20,
  },
  badgeNoActive: {
    backgroundColor: "red",
    position: "absolute",
    top: 7,
    right: -20,
  },
  loadingCard: {
    borderRadius: 10,
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: "2%",
    backgroundColor: "#FFF",
    elevation: 4,
    flexDirection: "column",
  },
  loadingTopCard: {
    backgroundColor: "#EEF1EE",
    maxWidth: "70%",
    borderRadius: 10,
    marginBottom: "2%",
    height: 10,
  },
  loadingBottomCard: {
    backgroundColor: "#EEF1EE",
    maxWidth: "90%",
    height: 10,
    borderRadius: 10,
  },
});
export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    auth: state.auth,
  };
})(AnnounceComponent);