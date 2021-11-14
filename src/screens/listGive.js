import React, { Component, useState, useEffect } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { connect } from "react-redux";
import config from "../config/config";
import fontSize from '../config/fontsize';
import { Entypo,AntDesign } from "@expo/vector-icons";
import color from '../config/color';

var { width } = Dimensions.get("window");
function ExpandableListView(props) {
  const [layoutHeight, setLayoutHeight] = useState(null);
  // useEffect(() => {
  //   if (props.item.isExpanded == false) {
  //     setLayoutHeight(null);
  //   } else {
  //     setLayoutHeight(0);
  //   }
  // });
  const showSelectedCategory = (item, category) => {
    props.navigation.navigate("ConfirmGive", {
      data: props.data,
      cateSelected: item.name,
    });
  };
  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onClickFunction}
        style={styles.categoryView}
      >
        <Text style={styles.categoryText}>{props.item.category}</Text>
        {/* <Image source={chevrondown} style={styles.iconStyle} /> */}
        {/* <View style={styles.iconStyle}>
          {props.item.isExpanded ? (
            <Entypo name="chevron-up" size={width * 0.06} color="#656464" />
          ) : (
            <Entypo name="chevron-down" size={width * 0.06} color="#656464" />
          )}
        </View> */}
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {props.item.subCategory.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.subCategoryText}
            onPress={() => showSelectedCategory(item, props.item.category)}
          >
            <Text style={{ fontSize: fontSize.fontsize_5 }}> {item.name} </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ListGive(props) {
  // create array to contain Expandable ListView items & create a State named as accordionData and store the array in this State
  const [fullName, setFullName] = useState();
  const [accordionData, setAccordionData] = useState([]);
  const data = props.route.params.data;
  useEffect(() => {
    getData();
    // getName();
  }, []);
  const getName = async () => {
    let Name = await SecureStore.getItemAsync("FullName");
    setFullName(Name);
  };
  const getData = () => {
    const arr = [];
    // console.log(data);
    let group = data.NameProduct.reduce((r, a) => {
      r[a.Category] = [...(r[a.Category] || []), a];
      return r;
    }, {});
    for (const property in group) {
      const childProduct = [];
      for (let i = 0; i < group[property].length; i++) {
        let tempChild = {
          id: group[property][i]._id,
          name: group[property][i].NameProduct,
          checked: false,
        };
        childProduct.push(tempChild);
      }
      const temp = {
        expanded: true,
        category: `${property}`,
        subCategory: childProduct,
      };
      arr.push(temp);
    }
    setAccordionData(arr);
  };

  // enable layout animation, toggle 'expanded' state for index and then update the layout
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...accordionData];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
        : (array[placeindex]["isExpanded"] = false)
    );
    setAccordionData(array);
  };

  const { dispatch, navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.wrapNameTop}>
        <AntDesign name="infocirlce" size={width*0.05} color={color.green} />
        <Text style={{ fontSize: config.fontsize_3, marginLeft: '2%' }}>
          Danh sách{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Khang
          </Text>{" "}
          cần hỗ trợ
        </Text>
      </View>
      <ScrollView contentContainerStyle={{}}>
        {accordionData.map((item, key) => (
          <ExpandableListView
            key={item.category}
            onClickFunction={() => updateLayout(key)}
            item={item}
            onPress={props.onPress}
            dispatch={dispatch}
            navigation={navigation}
            data={data}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  wrapNameTop: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    padding: "2%",
    alignItems: "center",
  },
  wrapIconTop: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: "2%",
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
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "5%",
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
  return { infoPost: state.infoPost, };
})(ListGive);
