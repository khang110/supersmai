import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import ButtonCategory from "../button/buttonCategory";
import Clothes from "../../../assets/clothes.png";
import Furnitures from "../../../assets/furnitures.png";
import Food from "../../../assets/food.png";
import ChildClothes from "../../../assets/childClothes.png";
import Study from "../../../assets/books.png";
import Electric from "../../../assets/electric.png";
import Exterior from "../../../assets/exterior.png";
import Vehicle from "../../../assets/vehicle.png";
import config from "../../config/config";
function GroupCategory(props) {
  const {navigation} = props;
  const handlePress = (value) => {
    navigation.navigate("DiscoverCategory");
  }

  return (
    <View>
      <View style={styles.wrapRow}>
        <ButtonCategory icon={Food} text={"Nhu yếu\nphẩm"} onPress={() => handlePress("Nhu yếu phẩm")}/>
        <ButtonCategory icon={Clothes} text={"Đồ người\nlớn"} />
        <ButtonCategory icon={ChildClothes} text={"Đồ trẻ\nem"} />
        <ButtonCategory icon={Study} text={"Đồ học\ntập"} />
      </View>
      <View style={styles.wrapRow}>
        <ButtonCategory icon={Furnitures} text={"Đồ gia\ndụng"} />
        <ButtonCategory icon={Electric} text={"Đồ điện\ntử"} />
        <ButtonCategory icon={Exterior} text={"Đồ ngoại\nthất"} />
        <ButtonCategory icon={Vehicle} text={"Xe cộ"} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: config.margin_1,
  },
});
export default GroupCategory;
