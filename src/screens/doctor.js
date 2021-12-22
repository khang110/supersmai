import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
  FlatList
} from "react-native";
var { width } = Dimensions.get("window");
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import config from "../config/config";
import color from "../config/color";
import fontSize from "../config/fontsize";
export default function MedicalAdvise(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await axios({
      method: "get",
      url: "https://api.smai.com.vn/doctor/get-doctors",
    })
      .then((resjson) => {
        setData(resjson.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dialCall = (number) => {
    var number_temp = "0" + number;
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number_temp}`;
    }

    Linking.openURL(phoneNumber);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.wrapItem}>
        <View style={styles.wrapTop}>
          <View>
            <Text style={styles.nameDoc}>BS. {item.NameDoctor}</Text>
            <View style={styles.wrapTime}>
              <Feather name="clock" size={width*0.03} color="gray" />
              <Text style={styles.time}>{item.TimeWork}</Text>
            </View>
          </View>
          <View style={styles.wrapCall}>
            <TouchableOpacity onPress={() => dialCall(item.PhoneNumber)}>
              <Feather name="phone-call" size={width * 0.05} color="#00a2e8" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapPosition}>
          <MaterialCommunityIcons
            name="briefcase-variant"
            size={width*0.05}
            color="black"
          />
          <Text style={styles.positionWork}>{item.Department}</Text>
        </View>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={ItemSeparatorView}
        // ListHeaderComponent={listheader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapItem: {
    padding: "4%",
  },
  wrapTop: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  nameDoc: {
    fontSize: fontSize.fontsize_2,
  },
  wrapTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
  },
  time: {
    fontSize: fontSize.fontsize_3,
    marginLeft: "2%",
    width: "80%",
    maxWidth: "80%",
  },
  wrapCall: {
    borderColor: "#00a2e8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
    borderRadius: 50,
    width: width * 0.1,
    height: width * 0.1,
  },
  wrapPosition: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
  },
  positionWork: {
    marginLeft: "2%",
    fontSize: fontSize.fontsize_3,
  },
});