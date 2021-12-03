import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Avatar, Input, CheckBox } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import config from "../config/config";
import { NavigationContainer } from "@react-navigation/native";

function personalInfo(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
 const { navigation,route } = props;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.personal_avatar}>
          <Avatar
            size={100}
            source={{
              uri: "https://www.w3schools.com/howto/img_avatar2.png",
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
        </View>
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

});
export default personalInfo;
