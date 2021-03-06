import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import Logo from "../../../assets/logo.png";
import config from "../../config/config";
import { Checkbox, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import userApi from "../../api/userApi";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import color from "../../config/color";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDu729pOxwXw-CUhfKL5qCiEzpEQbA3n3M",
    authDomain: "supersmai.firebaseapp.com",
    projectId: "supersmai",
    storageBucket: "supersmai.appspot.com",
    messagingSenderId: "302647414855",
    appId: "1:302647414855:web:f2530ca4c0c04509f26162",
    measurementId: "G-LBV53XNJ95",
  });
} catch (err) {
  // ignore app already initialized error in snack
}

function signup(props) {
  const [showPass, showPassWord] = useState(true);
  const [showPass2, showPassWord2] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  // const app = getApp();
  // const firebaseConfig = app ? app.options : undefined;
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const { dispatch, navigation, onPress } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.phonenumber) {
      let PhoneNumber = {
        PhoneNumber: data.phonenumber,
      };
      await userApi
        .checkphone(PhoneNumber)
        .then(async (response) => {
          if (response.data === "Oke") {
            let strphone = "+84" + data.phonenumber.substring(1);
            const phoneProvider = await new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              strphone,
              recaptchaVerifier.current
            );
            if (verificationId != null) {
              await dispatch({
                type: "REGISTER_OTP",
                username: data.username,
                phonenumber: data.phonenumber,
                password: data.password,
                verificationId: verificationId,
              });
            }
            props.navigation.navigate("verifyOTPs"); //chuy???n trang
          } else {
            Alert.alert("Th??ng b??o", "S??? ??i???n tho???i ???? t???n t???i", [
              { text: "OK" },
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* <View style={styles.logo_app}> */}
            {/* <Image source={Logo} style={styles.image_logo} /> */}
          {/* </View> */}
          <View style={styles.content_input}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.text_input}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  label="H??? v?? t??n"
                  underlineColor="transparent"
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: color.main_color,
                    },
                  }}
                />
              )}
              name="username"
              rules={{ required: "Y??u c???u nh???p ?????y ????? h??? v?? t??n" }}
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
                  label="S??? ??i???n tho???i"
                  keyboardType="numeric"
                  underlineColor="transparent"
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: color.main_color,
                    },
                  }}
                />
              )}
              name="phonenumber"
              rules={{
                required: "Y??u c???u nh???p s??? ??i???n tho???i",
                minLength: {
                  value: 10,
                  message: "S??? ??i???n tho???i ph???i c?? 10 s???",
                },
                maxLength: {
                  value: 10,
                  message: "S??? ??i???n tho???i t???i ??a 10 s???",
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
                  label="M???t kh???u"
                  passwordRules="true"
                  secureTextEntry={showPass}
                  underlineColor="transparent"
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: color.main_color,
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
              rules={{ required: "Y??u c???u nh???p m???t kh???u." }}
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
                  label="Nh???p l???i m???t kh???u"
                  underlineColor="transparent"
                  secureTextEntry={showPass2}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: color.main_color,
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
                required: "Y??u c???u nh???p m???t kh???u.",
                validate: (value) => {
                  if (value === getValues()["password"]) {
                    return true;
                  } else {
                    return "M???t kh???u kh??ng tr??ng nhau";
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
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          //attemptInvisibleVerification={true}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn_layout}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.text_btn_layout}>????ng k??</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  container: {
  
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
    marginTop: config.margin_4
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
  return { auth: state.auth, register: state.register };
})(signup);
