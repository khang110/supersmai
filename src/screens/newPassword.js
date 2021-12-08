import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import config from "../config/config";

function newPassword(props) {
  const { navigation } = props;
  const [showPass, showPassWord] = useState(true);
  const [showPass2, showPassWord2] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post("https://api.smai.com.vn/account/Forgot", {
        PhoneNumber: props.register.phonenumber,
        Password: data.password,
      })
      .then((res) => {
        navigation.replace("Authentication");
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.child_container}>
        <View style={styles.password}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Mật khẩu"
                secureTextEntry={showPass}
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
            )}
            name="password"
            rules={{
              required: "Yêu cầu nhập mật khẩu.",
              minLength: {
                value: 6,
                message: "Mật khẩu phải ít nhất 6 ký tự",
              },
            }}
            defaultValue=""
          />
        </View>
        {errors.password && (
          <Text style={styles.error}> {errors.password.message}</Text>
        )}

        <View style={styles.password}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Nhập lại mật khẩu"
                secureTextEntry={showPass2}
                theme={{
                  colors: {
                    primary: "gray",
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
        </View>
        {errors.repassword && (
          <Text style={styles.error}> {errors.repassword.message}</Text>
        )}
      </View>
      <View style={styles.layoutBtnLogin}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          color={config.color_btn_1}
          size="large"
        >
          <Text style={styles.btnLogin}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  child_container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "space-around",
  },

  username: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  phonenumber: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  password: {
    height: "14%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
  },
  textInput: {
    fontSize: 18,
    width: "95%",
    backgroundColor: "#FFF",
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
    color: "white",
    fontSize: 20,
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
  },
});
export default connect(function (state) {
  return { register: state.register };
})(newPassword);
