// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// // import { connect } from "react-redux";
// import * as SecureStore from "expo-secure-store";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Platform,
//   Switch,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import LogoSmai from "../../assets/logo_smai.png";
// import { Checkbox, TextInput } from "react-native-paper";
// import config from "../../config";
// import { Button } from "galio-framework";
// import AppLoading from "expo-app-loading";
// import {
//   useFonts,
//   OpenSans_400Regular,
//   OpenSans_400Regular_Italic,
//   OpenSans_600SemiBold,
//   OpenSans_600SemiBold_Italic,
//   OpenSans_700Bold,
//   OpenSans_700Bold_Italic,
// } from "@expo-google-fonts/open-sans";
// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }
// function Login(props) {
//   const { dispatch, navigation, onPress } = props;
//   const [PhoneNumber, onChangePhone] = useState("");
//   const [Password, onChangePass] = useState("");
//   const [checked, setChecked] = useState(true);
//   const [showPass, showPassWord] = useState(true);
//   const loginFunction = async (PhoneNumber, Password) => {
//     try {
//       await axios
//         .post("https://smai-app-api.herokuapp.com/account/login", {
//           PhoneNumber: PhoneNumber,
//           Password: Password,
//         })
//         .then(async (data) => {
//           if (data.status == 200) {
//             await save("token", "bearer " + data.data.accessToken);
//             await save("PhoneNumber", PhoneNumber);
//             await axios({
//               method: "get",
//               url: "https://smai-app-api.herokuapp.com/user/getInForUserByTokenId",
//               headers: {
//                 Authorization: "bearer " + data.data.accessToken,
//               },
//             }).then((data) => {
//               save("avatar", data.data.urlIamge);
//               save("FullName", data.data.FullName);
//             });
//             dispatch({
//               type: "SIGN_IN",
//               token: data.data.accessToken,
//               PhoneNumber: PhoneNumber,
//             });
//             props.onPress();
//           }
//         });
//     } catch (error) {
//       if (error) {
//         Alert.alert("Thông báo", "Số điện thoại hoặc mật khẩu không đúng", [
//           { text: "OK" },
//         ]);
//       }
//     }
//   };
//   const onToggleSwitch = () => setChecked(!checked); //dùng cho ios
//   let checkbox;
//   if (Platform.OS === "ios") {
//     //switch for ios
//     checkbox = (
//       <View style={styles.checkboxContainer}>
//         <Text style={styles.label}>Lưu tài khoản cho lần đăng nhập sau</Text>
//         <Switch
//           value={checked}
//           onValueChange={onToggleSwitch}
//           style={{ transform: [{ scaleX: 0.76 }, { scaleY: 0.76 }] }}
//         />
//       </View>
//     );
//   } else {
//     //check box
//     checkbox = (
//       <View style={styles.checkboxContainer}>
//         <Checkbox
//           style={styles.checkbox}
//           status={checked ? "checked" : "unchecked"}
//           onPress={() => {
//             setChecked(!checked);
//           }}
//           color={"green"}
//         />
//         <Text style={styles.label}>Lưu tài khoản cho lần đăng nhập sau</Text>
//       </View>
//     );
//   }
//   const [fontsLoaded, error] = useFonts({
//     OpenSans_400Regular,
//     OpenSans_400Regular_Italic,
//     OpenSans_600SemiBold,
//     OpenSans_600SemiBold_Italic,
//     OpenSans_700Bold,
//     OpenSans_700Bold_Italic,
//   });
//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.childContainer}>
//         <Image source={LogoSmai} style={styles.image_logo} />
//         <View style={styles.username}>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={(text) => onChangePhone(text)}
//             label="Số điện thoại"
//             keyboardType="numeric"
//             theme={{
//               colors: {
//                 primary: "gray",
//               },
//             }}
//           />
//         </View>
//         <View style={styles.password}>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={(text) => onChangePass(text)}
//             label="Mật khẩu"
//             secureTextEntry={showPass}
//             theme={{
//               colors: {
//                 primary: "gray",
//               },
//             }}
//             right={
//               <TextInput.Icon
//                 name="eye"
//                 onPress={() => {
//                   showPassWord(!showPass);
//                 }}
//               />
//             }
//           />
//         </View>

//         {checkbox}

//         <Text
//           style={styles.forgotPassword}
//           onPress={() => {
//             props.navigation.navigate("ForgotPasswords");
//           }}
//         >
//           Quên mật khẩu
//         </Text>
//       </View>
//       <View style={styles.layoutBtnLogin}>
//         <Button
//           onPress={() => {
//             loginFunction(PhoneNumber, Password);
//           }}
//           color={config.color_btn_1}
//           size="large"
//         >
//           <Text style={styles.btnLogin}>Đăng nhập</Text>
//         </Button>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: "5%",
//     width: "100%",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     justifyContent: "space-between",
//   },
//   childContainer: {
//     alignItems: "center",
//     backgroundColor: "#FFF",
//   },
//   textInput: {
//     fontSize: 18,
//     width: "95%",
//     backgroundColor: "#FFF",
//     fontFamily: "OpenSans_400Regular",
//   },
//   image_logo: {
//     maxHeight: "40%",
//     minHeight: "40%",
//     resizeMode: "contain",
//     marginBottom: "5%",
//   },
//   username: {
//     height: "10%",
//     maxWidth: "90%",
//     minWidth: "80%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     marginBottom: "5%",
//   },
//   password: {
//     height: "14%",
//     maxWidth: "90%",
//     minWidth: "80%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//   },

//   label: {
//     marginVertical: 8,
//     fontFamily: "OpenSans_400Regular",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     marginTop: "2%",
//   },
//   forgotPassword: {
//     alignSelf: "center",
//     fontSize: config.fontsize_3,
//     marginTop: "5%",
//     color: "blue",
//     fontFamily: "OpenSans_400Regular",
//   },

//   //btn
//   layoutBtnLogin: {
//     maxHeight: "10%",
//     minHeight: "8%",
//     maxWidth: "80%",
//     minWidth: "70%",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     marginBottom: "5%",
//   },
//   btnLogin: {
//     fontSize: 20,
//     color: "white",
//     fontFamily: "OpenSans_600SemiBold",
//   },
// });

// export default connect(function (state) {
//   return { auth: state.auth };
// })(Login);
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
function signup() {
    return (
        <View>
            <Text>Đăng ký nè</Text>
        </View>
    )
}

export default signup
