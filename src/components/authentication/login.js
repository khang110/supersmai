// // import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import config from "../../config/config";
import { Checkbox, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import userApi from "../../api/userApi";
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
function login(props) {
  const { dispatch } = props;
  const [showPass, showPassWord] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // đăng nhập
  const onSubmit = async (data) => {
    //  console.log(data)
    userApi.login(data).then(async(response) => {
      if (response.status == 201) {
        save("token", response.data.accessToken);
        save("PhoneNumber", data.PhoneNumber);
        await userApi.getInforuserByToken().then((data) => {
          let urlIamge = "null";
          if (data.data.urlIamge != undefined) {
            urlIamge = data.data.urlIamge;
          }
          save("avatar", urlIamge);
          save("FullName", data.data.FullName);
        });
        await dispatch({
          type: "SIGN_IN",
          token: response.data.accessToken,
          PhoneNumber: data.PhoneNumber,
        });
        props.onPress();
      }
    });
  };
  return (
    // <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
      <View style={styles.logo_app}>
        <Image source={Logo} style={styles.image_logo} />
      </View>
      <View style={styles.content}>
        <View style={styles.content_input}>
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
              />
            )}
            name="PhoneNumber"
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
          {errors.PhoneNumber && (
            <Text style={styles.error}> {errors.PhoneNumber.message}</Text>
          )}
          <Controller
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
            name="Password"
            rules={{ required: "Yêu cầu nhập mật khẩu." }}
            defaultValue=""
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn_layout}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.text_btn_layout}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
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
    height: "30%",
  },
  image_logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  content_input: {
    width: "90%",
    alignSelf: "center",
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
export default connect(function (state) {
  return { auth: state.auth };
})(login);
