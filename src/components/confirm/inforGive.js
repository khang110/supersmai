import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
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
import { connect } from "react-redux";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import RadioButtonRN from "radio-buttons-react-native";
import { Tooltip } from "react-native-elements";
import { HelperText } from "react-native-paper";
import config from "../../config/config";
function InforGive(props) {
  const data = [
    {
      label: "Hoàn cảnh khó khăn",
      value: "Cá nhân",
      id: 1,
    },
    {
      label: "Quỹ/nhóm từ thiện",
      value: "Quỹ/Nhóm từ thiện",
      id: 2,
    },
    {
      label: "Tổ chức công ích",
      value: "Tổ chức công ích",
      id: 3,
    },
  ];
  const { dispatch } = props;
  const { category, onPress } = props;
  const [address, setAddress] = useState("");
  const [typeAuthor, setTypeAuthor] = useState("");
  useEffect(() => {
    const getAddress = async () => {
      let addressDetail = await SecureStore.getItemAsync("detailAddress");
      return {
        addressDetail: addressDetail,
      };
    };
    getAddress().then((result) => {
      if (result) {
        setAddress(result.addressDetail);
      }
    });
  }, [props.infoPost.address]);

  const pressRadio = (item) => {
    dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: item.value });
  };

  const renderInfor = () => {
    if (props.infoPost.TypeAuthor == "tangcongdong") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.titleAddress}>Bạn là ai: </Text>
            <HelperText type="error" visible={props.errWho}>
              Chọn đối tượng
            </HelperText>
          </View>
          <View>
            <RadioButtonRN
              data={data}
              boxStyle={{ borderRadius: 20 }}
              textStyle={{ fontSize: fontSize.fontsize_4 }}
              animationTypes={["rotate"]}
              selectedBtn={(item) => pressRadio(item)}
            />
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>Cần hỗ trợ </Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
        </>
      );
    }
  };
  return (
    <View>
      <Text style={styles.nameAuthor}>{props.auth.FullName}</Text>
      <View style={styles.wrapAddress}>
        <Text style={styles.titleAddress}>Địa chỉ: </Text>
        <Text style={styles.address} numberOfLines={2}>
          {address == null ? "Nhập địa chỉ" : address}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <HelperText type="error" visible={props.errAddress}>
          Nhập địa chỉ
        </HelperText>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.changeAdd}>Thay đổi</Text>
        </TouchableOpacity>
      </View>
      {renderInfor()}
    </View>
  );
}

const styles = StyleSheet.create({
  nameAuthor: { fontWeight: "bold", fontSize: fontSize.fontsize_3 },
  wrapAddress: { flexDirection: "row", marginTop: "1%" },
  titleAddress: { fontSize: fontSize.fontsize_4, color: color.gray_2 },
  address: { fontSize: fontSize.fontsize_4, maxWidth: "85%" },
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

export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    typeUpPost: state.typeUpPost,
    auth: state.auth
  };
})(InforGive);
