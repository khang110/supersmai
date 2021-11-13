import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import config from "../../config/config";
import { Checkbox, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
function signup() {
  const [showPass, showPassWord] = useState(true);
  const [showPass2, showPassWord2] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

const onSubmit = async (data) => {
  console.log(data)
}

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo_app}>
          {/* <Image source={Logo} style={styles.image_logo} /> */}
        </View>
        <View style={styles.content_input}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                value={value}
                onChangeText={(value) => onChange(value)}
                label="Họ và tên"
                underlineColor="transparent"
                theme={{
                  colors: {
                    primary: config.black,
                  },
                }}
              />
            )}
            name="username"
            rules={{ required: "Yêu cầu nhập đầy đủ họ và tên" }}
            defaultValue=""
          />
          {errors.username && (
            <Text style={styles.error}> {errors.username.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                label="Số điện thoại"
                keyboardType="numeric"
                underlineColor="transparent"
                theme={{
                  colors: {
                    primary: config.black,
                  },
                }}
              />
            )}
            name="phonenumber"
            rules={{
              required: "Yêu cầu nhập số điện thoại",
              minLength: {
                value: 10,
                message: "Số điện thoại phải có 10 số",
              },
              maxLength: {
                value: 10,
                message: "Số điện thoại tối đa 10 số",
              },
            }}
            defaultValue=""
          />
          {errors.phonenumber && (
            <Text style={styles.error}> {errors.phonenumber.message}</Text>
          )}
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
                passwordRules="true"
                secureTextEntry={showPass}
                underlineColor="transparent"
                theme={{
                  colors: {
                    primary: config.black,
                  },
                }}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      showPassWord(!showPass);
                    }}
                  />
                }
              />
            )}
            name="password"
            rules={{ required: "Yêu cầu nhập mật khẩu." }}
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.error}> {errors.password.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Nhập lại mật khẩu"
                underlineColor="transparent"
                secureTextEntry={showPass2}
                theme={{
                  colors: {
                    primary: config.black,
                  },
                }}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      showPassWord2(!showPass2);
                    }}
                  />
                }
              />
            )}
            name="repassword"
            rules={{
              required: "Yêu cầu nhập mật khẩu.",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "Mật khẩu không trùng nhau";
                }
              },
            }}
            defaultValue=""
          />
          {errors.repassword && (
            <Text style={styles.error}> {errors.repassword.message}</Text>
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn_layout}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.text_btn_layout}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    paddingTop: "2%",
  },
  content: {
    fontSize: 18,
    width: "100%",
  },
  logo_app: {
    alignItems: "center",
    height: "10%",
  },
  image_logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  content_input: {
    width: "90%",
    alignSelf: "center",
    padding: config.margin_1,
  },
  text_input: {
    fontSize: 18,
    backgroundColor: config.active_color,
    // backgroundColor: config.active_color,
    fontSize: config.fontsize_3,
    marginTop: config.margin_4,
  },
  label: {
    color: config.black,
    paddingBottom: config.margin_1,
    paddingTop: config.margin_1,
    fontSize: config.fontsize_4,
  },

  //btn
  btn_layout: {
    backgroundColor: config.main_color,
    borderRadius: config.btn_border_radius,
    margin: "4%",
    padding: "2%",
  },
  text_btn_layout: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  error: {
    color: "#bf1650",
    alignSelf: "flex-start",
    
  },
});

export default signup;
