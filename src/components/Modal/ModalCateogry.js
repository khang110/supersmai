import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import check from "../../../assets/check.png";
import fontSize from "../../config/fontsize";
const App = (props) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: "center" }}>
              <Image source={check} style={{ width: 60, height: 60 }} />
              <Text style={styles.modalText}>{props.title}</Text>
              <Text style={{ marginBottom: "5%", fontSize: fontSize.fontsize_4 }}>
                {props.description}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.closeModal()}
            >
              <Text style={styles.textStyle}>Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: "4%",

    // alignItems: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSize.fontsize_3
  },
  modalText: {
    marginBottom: "8%",
    marginTop: "8%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.fontsize_2,
  },
});

export default App;
