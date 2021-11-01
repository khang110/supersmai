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
const uriImage =
  "https://images.pexels.com/photos/9727100/pexels-photo-9727100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const News = () => {
  return (
   
      <View >
           <TouchableOpacity style={styles.container}>
        <View style={{ width: "25%" }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 30 }}
            source={{ uri: uriImage }}
          />
        </View>

        <View style={{ width: "75%", justifyContent: "space-between" }}>
          <Text>Nhà có sách vở cũ</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Xe cộ</Text>
            <Text>Miễn phí</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>10h</Text>
            <Text>Thủ Đức, Hồ Chí Minh</Text>
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
    borderRadius: 30,
    padding: "1%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default News;
