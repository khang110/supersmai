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
import fontSize from '../../config/fontsize';
import config from '../../config/config';
function ButtonCategory(props) {
  const {icon, text, onPress} = props;
    return (
    <>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={config.screen_width*0.15}
            source={icon}
            avatarStyle={{
              borderColor: "white",
              borderRadius: 20,
            }}
          />
          <Text style={{textAlign: 'center', fontSize: fontSize.fontsize_4}}>{text}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default ButtonCategory;
