import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import axios from "axios";

var { width } = Dimensions.get("window");

export default function ConnectPost(props) {
  const { dispatch } = props;
  
  return (
    <TouchableOpacity>
        <Text>hihihihi</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    
  },
 
});
