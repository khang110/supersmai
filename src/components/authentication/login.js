// // import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Switch,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import config from "../../config/config";

function login() {
    return (
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <Image source={Logo} style={styles.image_logo} />

          {/* <View style={styles.username}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => onChangePhone(text)}
              label="Số điện thoại"
              keyboardType="numeric"
              theme={{
                colors: {
                  primary: "gray",
                },
              }}
            />
          </View>
          <View style={styles.password}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => onChangePass(text)}
              label="Mật khẩu"
           
              theme={{
                colors: {
                  primary: "gray",
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
          </View>

        

          <Text
            style={styles.forgotPassword}
            onPress={() => {
              props.navigation.navigate("ForgotPasswords");
            }}
          >
            Quên mật khẩu
          </Text>
        </View> */}
          {/* <View style={styles.layoutBtnLogin}>
          <Button
            onPress={() => {
              loginFunction(PhoneNumber, Password);
            }}
            color={config.color_btn_1}
            size="large"
          >
            <Text style={styles.btnLogin}>Đăng nhập</Text>
          </Button>*/}
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  childContainer: {
    alignItems: "center",
  },
  textInput: {
    fontSize: 18,
    width: "95%",
  },
  image_logo: {
    maxHeight: "40%",
    minHeight: "40%",
    resizeMode: "contain",
    marginBottom: "5%",
  },
  username: {
    height: "10%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "5%",
  },
  password: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  label: {
    marginVertical: 8,
   
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: "2%",
  },
  forgotPassword: {
    alignSelf: "center",
    fontSize: config.fontsize_3,
    marginTop: "5%",
    color: "blue",
  
  },

  //btn
  layoutBtnLogin: {
    maxHeight: "10%",
    minHeight: "8%",
    maxWidth: "80%",
    minWidth: "70%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "5%",
  },
  btnLogin: {
    fontSize: 20,
    color: "white",
   
  },
});

export default login;



