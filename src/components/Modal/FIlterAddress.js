import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import RNPickerDialog from "rn-modal-picker";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import ButtonConfirm from "../button/buttonConfirm";
import config from "../../config/config";
import db from "../../utils/db.json";
import fontSize from "../../config/fontsize";
import * as SecureStore from "expo-secure-store";
import { HelperText } from "react-native-paper";
function ModalDetailAddress(props) {
  const { modalVisible, closeModal } = props;
  const [isChage, setChange] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [errProvince, setErrProvince] = useState(false);
  const [errDistrict, setErrDistrict] = useState(false);
  const [errCommune, setErrCommune] = useState(false);
  const [errDetailAddr, setErrDetailAddr] = useState(false);
  const { dispatch } = props;
  //lay ra dia chi
  useEffect(() => {
    LogBox.ignoreLogs([
      "FloatingLabel: `ref` is not a prop. Trying to access it will result in `undefined` being returned",
    ]);
  }, []);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [data1, setData1] = useState([...db.province]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  //ham xu ly su kien chon tinh/tp
  const choseProvince = (item, change) => {
    if (change == true) setChange(true);
    setProvince(item);
    if (item.idProvince != province.idProvince) {
      setDistrict("");
      setCommune("");
    }
    let getDistrict = [...db.district];
    let count = data2.length;
    for (let i = 0; i < count; i++) {
      data2.pop();
    }
    for (let i = 0; i < getDistrict.length; i++) {
      if (getDistrict[i].idProvince == item.idProvince)
        data2.push(getDistrict[i]);
    }
    setData2(data2);
  };
  //ham xu ly su kien chon quan huyen
  const choseDistrict = (item, change) => {
    if (change == true) setChange(true);
    setDistrict(item);
    if (item.idDistrict != district.idDistrict) {
      setCommune("");
    }
    let getCommune = [...db.commune];
    let count = data3.length;
    for (let i = 0; i < count; i++) {
      data3.pop();
    }
    for (let i = 0; i < getCommune.length; i++) {
      if (getCommune[i].idDistrict == item.idDistrict)
        data3.push(getCommune[i]);
    }
    setData3(data3);
  };
  const choseCommune = (item) => {
    setChange(true);
    setCommune(item);
  };
  //Khai bao ham xu ly su kien click
  const pressFunc = () => {
    if (province == "") {
      setErrProvince(true);
    } else {
      setErrProvince(false);
      let address = "";
      if (commune.name != null) {
        address = `${commune.name}, ${district.name}, ${province.name}`;
      } else {
        if (district.name != null) {
          address = `${district.name}, ${province.name}`;
        } else {
          if (province.name != null) {
            address = `${province.name}`;
          }
        }
      }
      dispatch({ type: "FILTER_ADDRESS", addressFilter: address });
      closeModal();
    }
  };

  const errText = (value, type, show) => {
    if (show == true) {
      return (
        <HelperText type="error" visible={true} style={{ marginLeft: "4%" }}>
          {type}
        </HelperText>
      );
    } else return;
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            closeModal();
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View style={styles.border}>
                <View style={styles.containermain}>
                  <View style={styles.top}>
                    <TouchableOpacity onPress={() => closeModal()}>
                      <AntDesign
                        name="close"
                        size={config.screen_width * 0.05}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text style={styles.tittleText}>Địa chỉ của bạn</Text>
                  </View>
                  <View>
                    <RNPickerDialog
                      data={data1}
                      labelText={"Tỉnh/thành phố"}
                      showSearchBar={true}
                      showPickerTitle={true}
                      listTextStyle={styles.listTextStyle}
                      pickerStyle={styles.pickerStyle1}
                      selectedText={province.name}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      selectedValue={(index, item) => choseProvince(item)}
                    />
                    {errText(province, "Chọn tỉnh/thành phố", errProvince)}

                    <RNPickerDialog
                      data={data2}
                      labelText={"Quận/huyện"}
                      showSearchBar={true}
                      showPickerTitle={true}
                      listTextStyle={styles.listTextStyle}
                      pickerStyle={styles.pickerStyle1}
                      selectedText={district.name}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      selectedValue={(index, item) => choseDistrict(item)}
                    />

                    <RNPickerDialog
                      data={data3}
                      labelText={"Phường/xã/thị trấn"}
                      showSearchBar={true}
                      showPickerTitle={true}
                      listTextStyle={styles.listTextStyle}
                      pickerStyle={styles.pickerStyle1}
                      selectedText={commune.name}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      selectedValue={(index, item) => choseCommune(item)}
                    />
                  </View>

                  <View style={styles.wrapButton}>
                    <ButtonConfirm
                      onPress={() => pressFunc()}
                      title="Tìm theo"
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  wrapButton: {
    padding: "4%",
  },
  scrollModal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingLeft: "8%",
    paddingRight: "8%",
  },
  border: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  containermain: {
    borderWidth: 4,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#FFF",
  },

  selectedTextStyle1: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
    color: "black",
    fontSize: fontSize.fontsize_5,
    paddingLeft: 10,
    marginTop: 15,
  },
  listTextStyle: {
    color: "#000",
    marginLeft: 20,
    textAlign: "left",
  },
  searchBarStyle: {
    flexDirection: "row",
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  dropDownIconStyle1: {
    width: 10,
    // height: 10,
    left: -20,
  },
  pickerStyle1: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  top: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    borderColor: "#E0E0E0",
    borderWidth: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  tittleText: {
    fontSize: fontSize.fontsize_2,
    marginLeft: "5%",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  inputAddress: {
    paddingLeft: "4%",
    paddingRight: "4%",
    marginBottom: "4%",
    marginTop: "2%",
  },
  styleLabel: {
    fontSize: fontSize.fontsize_4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "gray",
    overflow: "hidden",
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    height: 50,
    justifyContent: "center",
  },
});

export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    dataFilter: state.dataFilter,
  };
})(ModalDetailAddress);
