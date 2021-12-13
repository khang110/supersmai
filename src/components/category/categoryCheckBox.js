import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable, Dimensions
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import config from '../../config/config';
import fontSize from '../../config/fontsize';
import ButtonConfirm from '../button/buttonConfirm';
var { width } = Dimensions.get("window");
function ExpandableListView(props) {
  const {dispatch} = props;
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [dataa, setDataa] = useState(props.item);
  useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);

  const showSelectedCategory = (id) => {
    const data = props.item;
    for (let i = 0; i < data.subCategory.length; i++) {
      if (data.subCategory[i].id == id) {
        data.subCategory[i].checked = !data.subCategory[i].checked;
      }
    }
    setDataa(data);
    props.onClickFunctionItem();
  };


  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onClickFunction}
        style={styles.categoryView}
      >
        <Text style={styles.categoryText}>{dataa.category} </Text>
        <View style={styles.iconStyle}>
          {dataa.isExpanded ? (
            <Entypo name="chevron-up" size={width*0.06} color="#656464" />
          ) : (
            <Entypo name="chevron-down" size={width*0.06} color="#656464" />
          )}
        </View>
      </TouchableOpacity>

      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {dataa.subCategory.map((subitem, key) => (
          <Pressable
            key={key}
            style={styles.subCategoryText}
            onPress={() => showSelectedCategory(subitem.id)}
          >
            <Text style={{ fontSize: fontSize.fontsize_5 }}>{subitem.name}</Text>
            <View style={styles.iconStyle}>
              {subitem.checked ? (
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  size={width*0.06}
                  color="#018786"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={width*0.06}
                  color="#A0A0A0"
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
function CategoryCheckBoxComponent(props) {
  const CONTENT = [
    {
      expanded: false,
      category: "Nhu yếu phẩm",
      subCategory: [
        { id: 1, name: 'Lương thực, thực phẩm', checked: false },
        { id: 2, name: 'Vật dụng cá nhân', checked: false },
        { id: 3, name: 'Vật tư y tế', checked: false },
        { id: 4, name: 'Mặt hàng khác' , checked: false},]
    },
    {
      expanded: false,
      category: "Đồ người lớn",
      subCategory: [
        { id: 5, name: 'Quần áo, giày dép nam' , checked: false},
        { id: 6, name: 'Quần áo, giày dép nữ' , checked: false},
        { id: 7, name: 'Đồ trang điểm, tư trang' , checked: false},
        { id: 8, name: 'Đồ mẹ bầu', checked: false },
        { id: 9, name: 'Đồ người cao tuổi nam' , checked: false},
        { id: 10, name: 'Đồ người cao tuổi nữ', checked: false },
        { id: 11, name: 'Đồ khác' , checked: false},]
    },
    {
      expanded: false,
      category: "Đồ trẻ em",
      subCategory: [
        { id: 12, name: 'Đồ chơi' , checked: false},
        { id: 13, name: 'Xe đẩy, bàn ăn', checked: false },
        { id: 14, name: 'Tả, bỉm, sữa cho bé' , checked: false},
        { id: 15, name: 'Quần áo bé trai' , checked: false},
        { id: 16, name: 'Quần áo bé gái', checked: false },
        { id: 17, name: 'Đồ khác', checked: false },]
    },
    {
      expanded: false,
      category: "Đồ học tập",
      subCategory: [
        { id: 18, name: 'Dụng cụ học tập', checked: false },
        { id: 19, name: 'Sách vở mẫu giáo' , checked: false},
        { id: 21, name: 'Sách vở lớp 1', checked: false },
        { id: 22, name: 'Sách vở lớp 2', checked: false },
        { id: 23, name: 'Sách vở lớp 3', checked: false },
        { id: 24, name: 'Sách vở lớp 4' , checked: false},
        { id: 25, name: 'Sách vở lớp 5', checked: false },
        { id: 26, name: 'Sách vở lớp 6', checked: false },
        { id: 27, name: 'Sách vở lớp 7', checked: false },
        { id: 28, name: 'Sách vở lớp 8', checked: false },
        { id: 29, name: 'Sách vở lớp 9', checked: false },
        { id: 30, name: 'Sách vở lớp 10', checked: false },
        { id: 31, name: 'Sách vở lớp 11', checked: false },
        { id: 32, name: 'Sách vở lớp 12', checked: false },
        { id: 33, name: 'Giáo trình ôn thi ĐH, CĐ', checked: false },
        { id: 34, name: 'Giáo trình các trường cao đẳng', checked: false },
        { id: 35, name: 'Giáo trình các trường đại học', checked: false },
        { id: 36, name: 'Truyện, báo, sách kỹ năng…', checked: false },
        { id: 37, name: 'Đồ học tập khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "Đồ gia dụng",
      subCategory: [
        { id: 38, name: 'Đồ nội trợ nhà bếp', checked: false },
        { id: 39, name: 'Máy lạnh, máy giặt, quạt,...', checked: false },
        { id: 51, name: 'Nệm, Chăn, gối, màn,...', checked: false },
        { id: 40, name: 'Đồ khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "Đồ điện tử",
      subCategory: [
        { id: 41, name: 'Tivi, loa, đài,...' , checked: false},
        { id: 42, name: 'Điện thoại, laptop, máy tính,...', checked: false },
        { id: 43, name: 'Đồ khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "Đồ nội ngoại thất",
      subCategory: [
        { id: 44, name: 'Bàn ghế, giường, tủ, kệ,...', checked: false },
        { id: 45, name: 'Cây cảnh, bàn ghế đá,...', checked: false },
        { id: 46, name: 'Gạch, cát, xi măng, sắt,...', checked: false },
        { id: 47, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "Xe cộ",
      subCategory: [
        { id: 48, name: 'Xe cho người khuyết tật' , checked: false},
        { id: 49, name: 'Xe đạp, xe điện, xe máy' , checked: false},
        { id: 50, name: 'Xe khác' },]
    },
  ];
  const [accordionData, setAccordionData] = useState([...CONTENT]);
 
  // cập nhật layout khi nhấn vào parent item
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    // mở nhiều cái
    array[index]["isExpanded"] = !array[index]["isExpanded"];
    setAccordionData(array);
  };
  //   cập nhật layout khi nhấn vào child item
  const updateLayoutItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const array = [...accordionData];
    setAccordionData(array);
  };

  const { dispatch } = props;

  //   function khi nhấn vào button tiếp theo
  const filterButton = async () => {
    //  lưu những ô đã checked
    // Array lưu những ô đã check để filter khi chuyển qua màn hình tặng cộng động
    let dataFilterPost = [];
    for (let i = 0; i < accordionData.length; i++) {
      let item = accordionData[i];
      for (let j = 0; j < item.subCategory.length; j++) {
        if (item.subCategory[j].checked == true) {
          let itemSub = {
            Category: item.category,
            NameProduct: item.subCategory[j].name,
          };
          dataFilterPost.push(itemSub);
        }
      }
    }
    if (dataFilterPost.length == 0 ) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 mục", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    } else {
      await dispatch({ type: "GET_NAME", NameProduct: dataFilterPost });
      await props.onPress();
    }
   
    
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {accordionData.map((item, key) => (
          <ExpandableListView
            key={item.category}
            onClickFunction={() => updateLayout(key)}
            onClickFunctionItem={() => updateLayoutItem()}
            item={item}
          />
        ))}
      </ScrollView>
      <View style={{margin: '4%'}}>
      <ButtonConfirm title="Tiếp theo" onPress={() => filterButton()}/>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  iconStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    tintColor: "#000",
  },
  subCategoryText: {
    fontSize: fontSize.fontsize_5,
    color: "#000",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    textAlign: "left",
    color: "#000000",
    fontSize: fontSize.fontsize_2,
    fontWeight: "bold",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "5%",
  },
  categoryView: {
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },



});
export default connect(function (state) {
  return {
    infoPost: state.infoPost,
  };
})(CategoryCheckBoxComponent);