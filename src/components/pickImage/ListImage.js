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
  TextInput,
  Alert,
} from "react-native";
import { connect } from 'react-redux';
import { Ionicons, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import config from '../../config/config';
function ShowImage(props) {
    const {dispatch, navigation} = props;
  const removeImage = (index) => {
    let listImage = props.infoPost.image;
    listImage.splice(index, 1);
    dispatch({ type: "GET_IMG", image: listImage });
  };

  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: img.uri }} style={styles.imgUpload} />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={{ position: "absolute", right: -5, top: -5 }}
            >
              <AntDesign
                name="closecircle"
                size={config.screen_width * 0.05}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: "2%", paddingRight: "2%" }}
    >
      <TouchableOpacity
        style={styles.borderUpload}
        onPress={() => navigation.navigate("PickImage")}
      >
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={config.screen_width * 0.1}
          color="#B1B1B1"
        />
      </TouchableOpacity>
      {renderIMG()}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    borderUpload: {
        width: config.screen_width * 0.2,
        height: config.screen_width * 0.2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#B1B1B1",
        borderWidth: 2,
        backgroundColor: "#FFF",
    
      },
      imgUpload: {
        height: config.screen_width * 0.2,
        width: config.screen_width * 0.2,
        borderRadius: 10,
        marginLeft: 10,
      },
})
export default connect(function (state) {
    return { infoPost: state.infoPost };
  })(ShowImage);