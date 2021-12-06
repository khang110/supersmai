import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Avatar, Input, CheckBox } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import config from "../config/config";
import { NavigationContainer } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import userApi from "../api/userApi";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

function personalInfo(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { navigation, route, dispatch } = props;
  const [isDisplay, setDisplay] = useState(false);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled == true) setDisplay(false);
    else {
      setDisplay(true);
      let formData = new FormData();
      let uri = pickerResult.uri;
      let uriArray = uri.split(".");
      let fileType = uriArray[uriArray.length - 1];
      formData.append("imageUser", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      userApi.updateProfileUser(formData).then(async (res) => {
        await userApi.getInforuserByToken().then(async(data) => {
          setDisplay(false);
          await SecureStore.setItemAsync("avatar", data.data.urlIamge);
          dispatch({ type: "GET_AVATAR", avatar: data.data.urlIamge });
        });
      });
    }
  };
  //loading
  const renderOnloading = () => {
    if (isDisplay == true) {
      return (
        <View style={styles.overlay_}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
  };

  const renderAvatar = () => {
   
      return (
        <View style={styles.personal_avatar}>
          <Avatar
            size={100}
            source={{
              uri: props.profile.avatar,
            }}
            iconStyle={{
              borderColor: "white",
              borderStyle: "solid",
              borderRadius: 10,
            }}
            containerStyle={{
              borderColor: "white",
              borderStyle: "solid",
              borderRadius: 10,
            }}
            avatarStyle={{
              borderColor: "white",
              borderRadius: 20,
            }}
          ></Avatar>
          {renderOnloading()}
          <Avatar.Accessory
            size={25}
            position="relative"
            onPress={() => {
              openImagePickerAsync();
            }}
          />
        </View>
      );
    
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {renderAvatar()}
        <View style={styles.content}>
          <Text style={styles.label}>Họ và tên</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={route.params.name}
                label="Họ và tên"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
          <Text style={styles.label}>Ngày sinh</Text>
          <Controller
            name="birthday"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={"09/03/2000"}
                label="Họ và tên"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
          <Text style={styles.label}>Số điện thoại</Text>
          <Controller
            name="phonenumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.text_input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={route.params.phonenumber}
                label="Họ và tên"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
        </View>
        <Text style={styles.label_checkbox}>Giới tính</Text>
        <View style={styles.checkbox}>
          <CheckBox
            containerStyle={styles.checkbox_icon}
            center
            title="Nam"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            uncheckedColor={config.white}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
          <CheckBox
            containerStyle={styles.checkbox_icon}
            center
            title="Nữ"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            uncheckedColor={config.white}
          />
          <CheckBox
            containerStyle={styles.checkbox_icon}
            center
            title="Khác"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            uncheckedColor={config.white}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: config.margin_1,
  },
  personal_avatar: {
    alignItems: "center",
    marginBottom: config.margin_3,
  },
  content: {
    padding: config.margin_1,
  },
  label: {
    color: config.black,
    paddingBottom: config.margin_1,
    paddingTop: config.margin_1,
    fontSize: config.fontsize_4,
  },
  text_input: {
    borderRadius: 10,
    height: 50,
    padding: config.margin_1,
    backgroundColor: config.active_color,
    fontSize: config.fontsize_3,
  },
  label_checkbox: {
    color: config.black,
    fontSize: config.fontsize_4,
    paddingLeft: config.margin_1,
  },
  checkbox: {
    flexDirection: "row",
    padding: 0,
  },
  checkbox_icon: {
    borderRadius: 10,
    backgroundColor: config.active_color,
  },
  overlay_: {
    position: "absolute",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.3,
    borderRadius: 47,
  },
});
export default connect(function (state) {
  return {
    profile: state.profile,
  };
})(personalInfo)
