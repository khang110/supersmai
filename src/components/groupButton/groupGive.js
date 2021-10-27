import React from "react";
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
import HeartRece from "../../../assets/xin.png";
import HeartGive from "../../../assets/cho.png";
import Medical from "../../../assets/medical-care.png";
import config from "../../config/config";
function Gift() {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.wrapButton}>
            <Image source={HeartGive} style={styles.wrapIcon} />
            <Text>Tặng đồ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.wrapButton}>
            <Image source={HeartRece} style={styles.wrapIcon} />
            <Text>Cần hỗ trợ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.wrapButton}>
            <Image source={Medical} style={styles.wrapIcon} />
            <Text>Tư vấn y tế</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: config.margin_2,
    paddingTop: config.margin_1, 
    paddingBottom: config.margin_1,
    backgroundColor: config.white,
    borderRadius: 20
  },
  wrapButton: { alignItems: "center" },
  wrapIcon: { height: 50, width: 50, marginBottom: config.margin_2 },
});
export default Gift;
