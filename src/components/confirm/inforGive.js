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
import fontSize from '../../config/fontsize';
import color from '../../config/color';

function InforGive(props) {
    const {category, onPress} = props;
  return (
    <View>
      <Text style={styles.nameAuthor}>Nguyễn Anh Khang</Text>
      <View style={styles.wrapAddress}>
        <Text style={styles.titleAddress}>Địa chỉ: </Text>
        <Text style={styles.address} numberOfLines={2}>
          210/2 Hoàng Diệu 2, Linh Chiểu, Thủ Đức, Hồ Chí Minh
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.changeAdd}>Thay đổi</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.titleAddress}>Đồ tặng: </Text>
        <Text style={styles.textCategory}>{category}</Text>
      </View>
      <View style={styles.wrapTypeWho}>
        <View>
          <Text style={styles.textWho}>Bên nhận </Text>
        </View>
        <View style={styles.lineBetween} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameAuthor: { fontWeight: "bold", fontSize: fontSize.fontsize_3 },
  wrapAddress: { flexDirection: "row", marginTop: "1%" },
  titleAddress: { fontSize: fontSize.fontsize_4, color: color.gray_2 },
  address: { fontSize: fontSize.fontsize_4, maxWidth: "90%" },
  changeAdd: {
    color: "#26c6da",
    fontSize: fontSize.fontsize_4,
  },
  textCategory: {
    fontSize: fontSize.fontsize_4,
    color: color.black,
    textDecorationLine: "underline",
  },
  wrapTypeWho: { flexDirection: "row", alignItems: "center", marginTop: "2%" },
  textWho: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.fontsize_3,
    color: "#BDBDBD",
  },
  lineBetween: { flex: 1, height: 0.5, backgroundColor: "#BDBDBD" },
});

export default InforGive;
