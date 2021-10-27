import React, { useEffect } from "react";
import { Avatar } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

function ButtonCategory(props) {
  const {icon, text} = props;
    return (
    <>
      <TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={60}
            source={icon}
            avatarStyle={{
              borderColor: "white",
              borderRadius: 20,
            }}
          />
          <Text style={{textAlign: 'center'}}>{text}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default ButtonCategory;
