import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import config from '../../config/config';
function SearchButton() {


  return (
    <>
        <TouchableOpacity>
          <View style={{flexDirection: 'row', 
          backgroundColor: config.white, 
          marginLeft: config.margin_2,
          marginRight: config.margin_2,
          marginBottom: config.margin_2,
          padding: config.margin_1,
          borderRadius: 20}}>
            <EvilIcons name="search" size={24} color={config.gray} />
            <Text style={styles.text}>Tìm kiếm</Text>
          </View>
        </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
      color: config.gray
  }
})
export default SearchButton;