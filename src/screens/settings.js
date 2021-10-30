import { StackRouter } from "@react-navigation/routers";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import config from "../config/config";

function settings(props) {
  const { navigation } = props;
  const logout = async () => {
      navigation.navigate("Authentication");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.btn_profile}>
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <Text style={styles.text_btn}>Thông tin tài khoản</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_profile}>
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <Text style={styles.text_btn}>Đổi mật khẩu</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.layout_logout}>
          <TouchableOpacity style={styles.btn_logout} onPress={() => logout()}>
            <Text style={styles.text_logout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: "5%",
  },
  btn_profile: {
    width: "100%",
    marginBottom: "6%",
  },
  view_btn: {
    alignItems: "center",
    paddingLeft: "8%",
    paddingRight: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view_icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon_btn: {
    padding: "2%",
    borderRadius: 10,
    backgroundColor: config.active_color,
    justifyContent: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    elevation: 14,
  },
  text_btn: {
    fontSize: config.fontsize_3,
  },

  layout_logout: {
    width: "100%",
    height: "100%",
    top: "300%",
    
  },
  //btn
  btn_logout: {
    height: config.btn_height,
    width: config.btn_width,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: config.red,
    borderRadius: config.btn_border_radius,
  },
  text_logout: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
export default settings;
