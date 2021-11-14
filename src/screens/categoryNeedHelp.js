import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput, Alert
} from "react-native";
import color from "../config/color";
import fontSize from "../config/fontsize";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

import CategoryCheckBox from '../components/category/categoryCheckBox';
import ButtonCancel from '../components/button/buttonCancel';
function CategoryNeedHelp(props) {
  const {navigation, dispatch} = props;
 
  const handlePress = () => {
      navigation.navigate("Confirm")    
  }
    return(
        <View style={styles.container}>
            <CategoryCheckBox onPress={() => handlePress()}/>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
export default connect(function (state) {
    return {
      infoPost: state.infoPost,
    };
  })(CategoryNeedHelp);