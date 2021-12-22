import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import config from "../config/config";
import AnnounceComponent from "../components/rows/anounceRow";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

const { width } = Dimensions.get("window");
function Announce(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  const getConnectPostDS = async () => {
    if (props.auth.isLogin == true) {
     
      await axios({
        method: "get",
        url: "https://app-super-smai.herokuapp.com/push/get-notification",
        headers: {
          Authorization: "bearer " + props.auth.token,
        },
      })
        .then((res) => {
          setData(res.data.data.data);
          // console.log(res.data.data.data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setrefreshing(false);
        });
    }
  };
  useEffect(() => {
    getConnectPostDS();
  }, []);
  const onRefresh = () => {
    setData([]);
    getConnectPostDS();
  };
  const renderItem = ({ item }) => {
    return (
      <AnnounceComponent
        bodyNotification={item.bodyNotification}
        updatedAt={item.updatedAt}
        titleNotification={item.titleNotification}
        idTransaction={item.idTransaction}
        idNotification={item._id}
        examined={item.ownerID[0].examined}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {props.auth.isLogin ? (
        <>
          {refreshing ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <ActivityIndicator color="#BDBDBD" size="small" />
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  colors={[config.main_color]}/>
              }
            />
          )}
        </>
      ) : (
        <>
          <View style={styles.notLogin}>
            <Text style={{ color: "#4B4C4F" }}>Vui lòng đăng nhập</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  notLogin: {
    backgroundColor: "#DDD",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
  };
})(Announce);