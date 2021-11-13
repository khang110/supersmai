import React, { useEffect, useState } from "react";
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
} from "react-native";
import color from "../config/color";
import fontSize from "../config/fontsize";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
const Row = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.wrapRow}>
        <Text style={{ fontSize: fontSize.fontsize_3 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
function WhoScreen(props) {
  const { dispatch, navigation } = props;

  const handlePress = (value) => {
    dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: value });
    navigation.navigate("CategoryNeedHelp");
  };

  return (
    <View style={styles.container}>
      <Row title="Hoàn cảnh khó khăn" onPress={() => handlePress("Cá nhân")} />
      <Row
        title="Nhóm từ thiện"
        onPress={() => handlePress("Quỹ/Nhóm từ thiện")}
      />
      <Row
        title="Tổ chức công ích"
        onPress={() => handlePress("Tổ chức công ích")}
      />

      <View style={styles.wrapNote}>
        <AntDesign name="infocirlce" size={24} color="#4CAF50" />
        <Text style={styles.titleNote}>Ghi chú</Text>
      </View>
      <Text style={styles.textContent}>
        Tổ chức công ích bao gồm: {"\n"}- Trường học{"\n"}- Bệnh viện{"\n"}-
        UBND, Hội Chữ Thập Đỏ{"\n"}- Nhà thờ, ... {"\n"}cần quyên góp xây dựng
        "đường, cầu cống, nhà tình thương,..."
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapRow: { backgroundColor: "#FFF", padding: "4%", marginBottom: "1%" },
  wrapNote: { flexDirection: "row", margin: "4%", alignItems: "center" },
  titleNote: { fontSize: fontSize.fontsize_2, marginLeft: "3%" },
  textContent: {
    marginLeft: "6%",
    fontSize: fontSize.fontsize_4,
    marginRight: "6%",
  },
});
export default connect(function (state) {
  return {
    infoPost: state.infoPost,
  };
})(WhoScreen);
