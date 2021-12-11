import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import OTPTextView from "react-native-otp-textinput";
// import axios from "axios";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import config from "../config/config";
import userApi from "../api/userApi";
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
function forgotPassword(props) {
  const { dispatch, navigation, onPress } = props;
  const [PhoneNumber, onChangePhone] = useState("");
  const [error, setError] = useState(null);
  const [otpInput, setotpInput] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const onCheckPhoneNumber = async () => {
    if (PhoneNumber.length != 10) {
      setError("Nhập đủ 10 số");
    } else {
      setError(null);
      let phonenumber = {
        PhoneNumber,
      };
      console.log(phonenumber);
      userApi.getPhone(phonenumber).then(async(res)=>{
        if (res.data == "PhoneNumber already taken") {
            let strphone = "+84" + PhoneNumber.substring(1);
            const phoneProvider = await new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              strphone,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
          } else {
            alert("Số điện thoại không tồn tại");
          }
      })
    }
  };
   const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otpInput
      );
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          await onChangePhone("");
          await setotpInput("");
          await dispatch({
            type: "RESET_PASSWORD",
            phonenumber: PhoneNumber,
          });
          await props.navigation.navigate("newPassword");
        });
    } catch (error) {
      alert(error);
    }
 };
  return (
    <View style={styles.wrapContent}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.styleText}>Nhập số điện thoại:</Text>
      <View style={styles.username}>
        <TextInput
          style={styles.text_input}
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
      {error && <Text style={styles.error}> {error}</Text>}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={onCheckPhoneNumber}
      >
        <Text style={styles.btnText}>Xác nhận số điện thoại</Text>
      </TouchableOpacity>
      <Text style={styles.styleText}>Nhập mã OTP</Text>
      <View style={styles.container}>
        <OTPTextView
          handleTextChange={(e) => setotpInput(e)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={confirmCode}
      >
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContent: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    paddingTop: "2%",
  },
  styleText: {
    marginBottom: 30,
    fontSize: 20,
  },
  btn: {
    marginBottom: "15%",
    paddingVertical: 10,
    paddingHorizontal: "14%",
    backgroundColor: config.main_color,
    borderRadius: config.btn_border_radius,
  },
  btnText: {
    color: config.white,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    marginTop: 35,
    paddingVertical: 10,
    paddingHorizontal: "32%",
    backgroundColor: "#E53935",
    borderRadius: config.btn_border_radius,
    
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  optStyle: {
    flexDirection: "row",
    marginBottom: 60,
  },
  optInput: {
    borderWidth: 0.5,
    // borderColor: "red",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontSize: 16,
    textAlign: "center",
  },
  text_input: {
    fontSize: 20,
    width: "95%",
    backgroundColor: config.active_color,
  },
  username: {
    height: "10%",
    maxWidth: "90%",
    minWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "15%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    width: "10%",
    height: "100%",
    fontSize: 18,
  },
  error: {
    color: "#bf1650",
    alignSelf: "flex-start",
  },
});
export default connect(function (state) {
  return { register: state.register };
})(forgotPassword);
