// // import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import config from "../../config/config";
import { Checkbox } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";


function login() {
   const [showPass, showPassWord] = useState(true);
    const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logo_app}>
            <Image source={Logo} style={styles.image_logo} />
          </View>
          <View style={styles.content_input}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Controller
              name="phonnumber"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.text_input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Số điện thoại"
                  keyboardType="numeric"
                />
              )}
            />
            <Text style={styles.label}>Mật khẩu</Text>
            <Controller
              name="Password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.text_input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  passwordRules="true"
                  secureTextEntry={true}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.layout_btn}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  content: {
    fontSize: 18,
    width: "100%",
    height: "70%",
  },
  logo_app: {
    alignItems: "center",
    marginTop: config.fontsize_4,
  },
  image_logo: {
    maxHeight: "100%",
    minHeight: "100%",
    resizeMode: "contain",
  },
  content_input: {
    width: "90%",
    alignSelf: "center",
    padding: config.margin_1,
  },
  text_input: {
    borderRadius: 10,
    height: 55,
    padding: config.margin_1,
    backgroundColor: config.active_color,
    fontSize: config.fontsize_3,
  },
  label: {
    color: config.black,
    paddingBottom: config.margin_1,
    paddingTop: config.margin_1,
    fontSize: config.fontsize_4,
  },

  // checkboxContainer: {
  //   flexDirection: "row",
  //   marginTop: "2%",
  // },
  // forgotPassword: {
  //   alignSelf: "center",
  //   fontSize: config.fontsize_3,
  //   marginTop: "5%",
  //   color: "blue",
  // },
  layout_btn: {
    width: "100%",
    height: "70%",
    top: "155%",
  },
  //btn
  btn: {
    height: config.btn_height,
    width: config.btn_width,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: config.main_color,
    borderRadius: config.btn_border_radius,
  },
  text_btn: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default login;
