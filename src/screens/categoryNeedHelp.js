import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import color from "../config/color";
import fontSize from "../config/fontsize";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

function CategoryNeedHelp(props) {

    return(
        <View>
            <Text>Danh mục cần hỗ trợ</Text>
        </View>
    )
}

export default connect(function (state) {
    return {
      infoPost: state.infoPost,
    };
  })(CategoryNeedHelp);