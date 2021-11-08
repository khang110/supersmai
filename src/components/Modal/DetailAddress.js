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
import { Input } from "react-native-elements";
function ModalDetailAddress(props) {
  const { modalVisible, closeModal } = props;
  const [isChage, setChange] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const { dispatch } = props;
  //lay ra dia chi
  useEffect(() => {
    // ẩn warning
    LogBox.ignoreLogs([
      "FloatingLabel: `ref` is not a prop. Trying to access it will result in `undefined` being returned",
    ]);
    //lay ra dia chi da duoc luu truoc do

    //lay ra dia chi va gan chung vao cac o input
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
    if (
      province == "" ||
      district == "" ||
      commune == "" ||
      addressDetail.trim() == ""
    ) {
      if (province == "") {
        Alert.alert("Thông báo", "Vui lòng chọn tỉnh/thành phố", [
          { text: "OK" },
        ]);
      } else {
        if (district == "") {
          Alert.alert("Thông báo", "Vui lòng chọn quận/huyện", [
            { text: "OK" },
          ]);
        } else {
          if (commune == "") {
            Alert.alert("Thông báo", "Vui lòng chọn phường/xã", [
              { text: "OK" },
            ]);
          } else {
            if (addressDetail.trim() == "") {
              Alert.alert("Thông báo", "Vui lòng điền đường/ấp/thôn/số nhà", [
                { text: "OK" },
              ]);
            }
          }
        }
      }
    } else {
      //neu ctrinh chay vao day tuc la khong co thay doi ve dia chi
      async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      save("idProvince", province.idProvince).then(() => {
        save("province", province.name).then((res) => {
          save("idDistrict", district.idDistrict).then((res) => {
            save("district", district.name).then((res) => {
              save("idCommune", commune.idCoummune).then((res) => {
                save("commune", commune.name).then((res) => {
                  save("detail", addressDetail).then((res) => {
                    const { dispatch } = props;
                    const address = `${addressDetail.trim()}, ${
                      commune.name
                    }, ${district.name}, ${province.name}`;
                    dispatch({ type: "CONFIRM_ADDRESS", address: address });
                    closeModal();
                  });
                });
              });
            });
          });
        });
      });
    }
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
                      // placeHolderText={this.state.placeHolderText}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      //dropDownIcon={require('../assets/pin.png')}
                      selectedValue={(index, item) => choseProvince(item)}
                    />

                    <RNPickerDialog
                      data={data2}
                      labelText={"Quận/huyện"}
                      showSearchBar={true}
                      showPickerTitle={true}
                      listTextStyle={styles.listTextStyle}
                      pickerStyle={styles.pickerStyle1}
                      selectedText={district.name}
                      // placeHolderText={this.state.placeHolderText}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      //dropDownIcon={require('../assets/pin.png')}
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
                      // placeHolderText={this.state.placeHolderText}
                      searchBarPlaceHolder={"Search....."}
                      searchBarPlaceHolderColor={"#9d9d9d"}
                      selectedTextStyle={styles.selectedTextStyle1}
                      placeHolderTextColor={"black"}
                      dropDownIconStyle={styles.dropDownIconStyle1}
                      searchBarStyle={styles.searchBarStyle}
                      //dropDownIcon={require('../assets/pin.png')}
                      selectedValue={(index, item) => choseCommune(item)}
                    />
                  </View>
                  <View style={styles.inputAddress}>
                    <TextInput
                      label="Đường/ấp/thôn/số nhà,..."
                      style={styles.styleLabel}
                      mode={"flat"}
                      dense={"true"}
                      autoCapitalize="none"
                      value={addressDetail}
                      multiline
                      underlineColor="transparent"
                      onChangeText={(text) => {
                        setAddressDetail(text);
                      }}
                      theme={{
                        colors: {
                          primary: "gray",
                        },
                      }}
                    />
                  </View>
                  <View style={styles.wrapButton}>
                    <ButtonConfirm
                      onPress={() => pressFunc()}
                      title="Thay đổi"
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
    borderWidth: 3,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#FFF",
  },

  selectedTextStyle: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
    color: "black",
    fontSize: fontSize.fontsize_2,
    paddingLeft: 10,
    marginTop: -2,
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
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  searchBarStyle: {
    marginBottom: 10,
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
  placeHolderTextStyle: {
    color: "red",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row",
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    left: -40,
  },
  dropDownIconStyle1: {
    width: 10,
    height: 10,
    left: -40,
    marginTop: 15,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 60,
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 2,
    elevation: 0.5,
  },
  pickerStyle1: {
    height: 60,
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
  },
  styleLabel: {
    fontSize: fontSize.fontsize_4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "gray",
    overflow: "hidden",
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    height: 60,
    
  },
});

export default connect(function (state) {
  return {
    infoPost: state.infoPost,
  };
})(ModalDetailAddress);
