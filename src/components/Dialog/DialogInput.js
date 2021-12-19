import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import color from '../../config/color';
import fontSize from '../../config/fontsize';
export default function App(props) {
  const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");


  return (
    <View style={styles.container}>
      <Dialog.Container visible={props.visible}>
        <Dialog.Title style={{fontWeight: 'bold', fontSize: fontSize.fontsize_2}}>{props.title}</Dialog.Title>
        <Dialog.Input  onChangeText={(text) => setText(text)}  placeholder="Nhập lời nhắn(nếu có)" 
        style={{fontSize: fontSize.fontsize_3}}></Dialog.Input>
        <Dialog.Button label="Hủy" onPress={props.handleCancel} bold={true} color={color.main_color}/>
        <Dialog.Button label="Xong" onPress={() => props.handleDelete(text)} bold={true} color={color.main_color} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
});