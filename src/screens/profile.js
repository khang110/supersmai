import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import config from "../config/config";
import { Avatar } from "react-native-elements";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";

function Profile(props) {
  const [FullName, getFullName] = useState("");
  const [avatar, getAvatar] = useState("");
  const [phonenumber, getPhoneNumber] = useState("");
  const [isDisplay, setDisplay] = useState(false);
  const { navigation } = props;
  // get Infor User
  const getInforUser = async () => {
    if (props.auth.isLogin == true) {
      let fullName = await SecureStore.getItemAsync("FullName");
      let avatar = await SecureStore.getItemAsync("avatar");
      console.log(avatar);
      let phonenumber = await SecureStore.getItemAsync("PhoneNumber");
      getFullName(fullName);
      getPhoneNumber(phonenumber);
      getAvatar(avatar);
    }
  };
  useEffect(() => {
    getInforUser();
  }, [props.auth]);

  //personalInfor
  const btn_personalInfor = async () => {
    if (props.auth.isLogin == true) {
      navigation.navigate("PersonalInfo", {
        name: FullName,
        avatar: avatar,
        phonenumber: phonenumber,
      });
    }else{
      navigation.navigate("Authentication");
    }
  };
  //btn Settings
  const btnSettings = async () => {
      if (props.auth.isLogin == true) {
        navigation.navigate("Settings", {
          name: FullName,
          avatar: avatar,
          phonenumber: phonenumber,
        });
      } else {
        navigation.navigate("Authentication");
      }
  };
  // btn Login
  const btnLogin = async () => {
    navigation.navigate("Authentication");
  };
  const check_isLogin = () => {
    if (props.auth.isLogin == false) {
      return (
        <View style={styles.content_header}>
          <Avatar
            size={70}
            source={{
              uri: "https://www.w3schools.com/howto/img_avatar2.png",
            }}
            avatarStyle={{
              borderColor: "white",
              borderRadius: 20,
            }}
          ></Avatar>
          <View style={styles.text_header}>
            <Button
              onPress={() => btnLogin()}
              title="Đăng nhập/Đăng ký"
              buttonStyle={styles.buttonLogIn}
              titleStyle={styles.titleStyle}
              type="outline"
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.content_header}>
          <View>
            <Avatar
              size={70}
              source={{
                uri: "https://www.w3schools.com/howto/img_avatar2.png",
              }}
              avatarStyle={{
                borderColor: "white",
                borderRadius: 20,
              }}
            ></Avatar>
          </View>
          <View style={styles.text_header}>
            <Text style={styles.name_user}>{FullName}</Text>
            <Text style={styles.type_user}>Cá nhân</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {check_isLogin()}
        <View style={styles.boder_bottom}></View>

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btn_personalInfor()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <FontAwesome
                    style={{ textAlign: "center" }}
                    name="user"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Thông tin cá nhân</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btn_personalInfor()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <FontAwesome
                    style={{ textAlign: "center" }}
                    name="heart"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Bài viết yêu thích</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btn_personalInfor()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <MaterialCommunityIcons
                    style={{ textAlign: "center" }}
                    name="clock"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Lịch sử xem</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btn_personalInfor()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <FontAwesome
                    style={{ textAlign: "center" }}
                    name="phone"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Hỗ trợ</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boder_bottom}></View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btnSettings()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="settings-sharp"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Cài đặt và bảo mật</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn_profile}
            onPress={() => btn_personalInfor()}
          >
            <View style={styles.view_btn}>
              <View style={styles.view_icon}>
                <View style={styles.icon_btn}>
                  <MaterialIcons
                    style={{ textAlign: "center" }}
                    name="lightbulb"
                    size={24}
                    color="#000000"
                  />
                </View>
                <Text style={styles.text_btn}>Góp ý</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000000"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content_header: {
    padding: "8%",
    marginTop: "6%",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "5%",
  },
  avatar_header: {},
  text_header: {
    marginLeft: "4%",
  },
  name_user: {
    fontSize: config.fontsize_1,
  },
  type_user: {
    fontSize: config.fontsize_3,
  },
  content: {
    width: "100%",
    marginTop: "6%",
  },
  btn_profile: {
    width: "100%",
    marginBottom: "5%",
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
    width: config.screen_height / 17,
    height: config.screen_height / 17,
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
  boder_bottom: {
    marginLeft: "8%",
    width: "85%",
    borderBottomColor: config.border_bottom,
    borderBottomWidth: 1,
  },
});
export default connect(function (state) {
  return { auth: state.auth };
})(Profile);
