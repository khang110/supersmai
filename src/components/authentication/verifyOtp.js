import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import OTPTextView from "react-native-otp-textinput";
import * as firebase from "firebase";
import userApi from "../../api/userApi";
import * as SecureStore from "expo-secure-store";
import config from "../../config/config";
import Logo from "../../../assets/logo.png";
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
function VerifyOtp(props) {
  const { dispatch } = props;
  const [isDisplay, setIsDisplay] = useState(false);
  const [otpInput, setotpInput] = useState("");
  let tokenDevice = SecureStore.getItemAsync("tokenDevice");
  const confirmCode = () => {
    if (otpInput.length != 6) {
      alert("Nhập đầy đủ 6 số");
    } else {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        props.register.verificationId,
        otpInput
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          setIsDisplay(true);
          data = {
            FullName: props.register.username,
            PhoneNumber: props.register.phonenumber,
            Password: props.register.password,
          };
          userApi.register(data).then(async (respone) => {
            if (respone.status == 201 && respone.data.message == "OK") {
              // await save("token", respone.data.accessToken);
              // await save("PhoneNumber", props.register.phonenumber);
              // await save("FullName", props.register.username);
              // if (props.auth.token == "null") {
              //   await dispatch({
              //     type: "SIGN_IN",
              //     token: respone.data.accessToken,
              //     PhoneNumber: data.phonenumber,
                  
              //   });
              // }

              await props.navigation.replace("Authentication");
              setIsDisplay(false);
            }
          });
        })
        .catch((error) => {
          console.error("The Promise is rejected!", error);
          setIsDisplay(false);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo_app}>
        <Image source={Logo} style={styles.image_logo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.styleText}>Nhập mã OTP</Text>
        <OTPTextView
          handleTextChange={(e) => setotpInput(e)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          tintColor={config.main_color}
        />
      </View>
      <TouchableOpacity style={styles.btn_layout} onPress={confirmCode}>
        <Text style={styles.text_btn_layout}>Xác nhận</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },

  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 1,
    width: "12%",
    height: "100%",
    fontSize: 18,
    
  },
  logo_app: {
    alignItems: "center",
    height: "25%",
  },
  image_logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  styleText: {
    marginBottom: "1%",
    fontSize: 16,
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
});
export default connect(function (state) {
  return { auth: state.auth, register: state.register };
})(VerifyOtp);
