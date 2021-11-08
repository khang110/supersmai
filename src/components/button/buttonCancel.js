import React from "react";
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
  Alert, Pressable
} from "react-native";
import color from '../../config/color';
function ButtonCancel(props) {
  return (
    <Pressable
      style={styles.wrapTextCancel}
      onPress={() => {
        Alert.alert("Thông báo", "Bạn có chắc muốn hủy!", [
          {
            text: "Không",
            style: "cancel",
          },
          {
            text: "Có",
            style: "cancel",
            onPress: () => props.onPress(),
          },
        ]);
      }}
    >
      <Text style={styles.textCancel}>Hủy</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
    wrapTextCancel: {
        marginRight: '15%',
      },
      textCancel: {
        color: color.white,
      
      },
});

export default ButtonCancel;