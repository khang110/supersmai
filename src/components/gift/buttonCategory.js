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
import Furnitures from "../../../assets/furnitures.png";
function ButtonCategory() {
  return (
    <>
      <TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={70}
            source={Furnitures}
            avatarStyle={{
              borderColor: "white",
              borderRadius: 20,
              backgroundColor: "#BDBDBDAA",
            }}
          />
          <Text>Nội thất</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default ButtonCategory;
