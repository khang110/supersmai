import React, { useEffect, useState, useLayoutEffect } from "react";
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
  Alert,
} from "react-native";
import fontSize from "../config/fontsize";
import color from "../config/color";
const Row = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.wrapRow}>
        <Text style={{ fontSize: fontSize.fontsize_3 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

function ServiceGive(props) {
    const {navigation} = props;

    const pressTCD = () => {
        navigation.navigate("Category");
    }
    const pressGroup = (type) => {
      navigation.navigate("GiveGroups", {typeAuthor: type});
    }

  return (
    <View style={styles.container}>
      <Row title="Tặng cộng đồng" onPress={() => pressTCD()}/>
      <Row title="Tặng hoàn cảnh khó khăn"  onPress={() => pressGroup("canhan")}/>
      <Row title="Tặng Quỹ/Nhóm từ thiện" onPress={() => pressGroup("quy")}/>
      <Row title="Đóng góp công ích" onPress={() => pressGroup("tochuc")}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapRow: { backgroundColor: '#FFF', padding: '4%', marginBottom: '1%'}
});
export default ServiceGive;
