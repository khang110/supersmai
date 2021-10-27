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
import { Avatar, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import config from "../config/config";
function personalInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <ScrollView>
      <View>
        <View>
          <Avatar
            size={70}
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
        <View>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Họ và tên"
                value="Nguyễn Duy Phú"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Họ và tên"
                value="Nguyễn Duy Phú"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Họ và tên"
                value="Nguyễn Duy Phú"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Họ và tên"
                value="Nguyễn Duy Phú"
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    borderColor: "#000000",
    borderRadius: 10,
    borderWidth: 0.5,
    height: 50,
    padding: 10,
    width: "80%",
    backgroundColor: config.active_color
  },
});
export default personalInfo;
