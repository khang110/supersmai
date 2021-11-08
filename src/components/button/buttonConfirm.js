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
import color from '../../config/color';
import fontSize from '../../config/fontsize';
function ButtonConfirm(props) {
    return (
        <TouchableOpacity style={{backgroundColor: color.main_color, padding: '2%', borderRadius: 20,
        alignItems: 'center'}}>
            <Text style={{color: color.white, fontSize: fontSize.fontsize_3}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})

export default ButtonConfirm;