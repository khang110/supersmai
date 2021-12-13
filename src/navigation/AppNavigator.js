import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "../navigation/Tabs";
import personalInfo from "../screens/personalInfo";
import settings from "../screens/settings";
import DetailPost from '../screens/detailpost';
import Category from '../screens/category';
import Confirm from '../screens/confirm';
import PickImage from '../screens/pickimage';
import ServiceGive from '../screens/servicegive';
import WhoYou from '../screens/who';
import CategoryNeedHelp from '../screens/categoryNeedHelp';
import DiscoverCategory from '../screens/discoverCategory';
import GiveGroups from '../screens/giveGroup';
import LetMessage from '../screens/letMessage';
import ListGive from '../screens/listGive';
import ConfirmGive from '../screens/confirmGive';
import DetailConnect from '../screens/detailConnect';
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import config from "../config/config";
import color from '../config/color';
import authentication from "../screens/authentication";
import { Ionicons,Entypo } from '@expo/vector-icons';
import { connect } from "react-redux";
import verifyOTPs from "../screens/verifyOtps";
import forgotPassword from "../screens/forgotPassword";
import newPassword from "../screens/newPassword";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";

const Stack = createStackNavigator();
function AppNavigator(props) {
  const { navigation, dispatch } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            headerShown: false,
            title: "Trang chủ",
          }}
        />

        <Stack.Screen
          name="PersonalInfo"
          component={personalInfo}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Thông tin cá nhân",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={settings}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Cài đặt và bảo mật",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="Authentication"
          component={authentication}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Tài khoản",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Chi tiết tin đăng",
            headerTintColor: color.white,
            headerTitleAlign: "center",
     
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="DetailConnect"
          component={DetailConnect}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Chi tiết kết nối",
            headerTintColor: color.white,
            headerTitleAlign: "center",
     
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Danh mục gửi tặng",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="Confirm"
          component={Confirm}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Xác nhận gửi tặng",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="PickImage"
          component={PickImage}
          options={({ navigation, route }) => ({
            headerShown: true,
            headerTintColor: color.white,
            title: "Đã chọn 0 hình ảnh",
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="ServiceGive"
          component={ServiceGive}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Chọn đối tượng gửi tặng",
            headerTintColor: color.white,

            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="WhoYou"
          component={WhoYou}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Bạn là ai",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="CategoryNeedHelp"
          component={CategoryNeedHelp}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Danh mục cần hỗ trợ",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="DiscoverCategory"
          component={DiscoverCategory}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Tin tặng cộng đồng",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="GiveGroups"
          component={GiveGroups}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Danh sách cần hỗ trợ",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="LetMessage"
          component={LetMessage}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Để lại lời nhắn",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="ListGive"
          component={ListGive}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: route.params.name,
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmGive"
          component={ConfirmGive}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Xác nhận gửi tặng",
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="verifyOTPs"
          component={verifyOTPs}
          options={({ navigation }) => ({
            title: "Xác nhận OTP",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTintColor: color.white,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackImage: () => (
              <Entypo name="chevron-thin-left" size={25} color="#FFF" />
            ),
          })}
        />
        <Stack.Screen
          name="forgotPassword"
          component={forgotPassword}
          options={({ navigation }) => ({
            title: "Quên mật khẩu",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTintColor: config.white,
          })}
        />
        <Stack.Screen
          name="newPassword"
          component={newPassword}
          options={({ navigation }) => ({
            title: "Mật khẩu mới",
            headerShown: true,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTintColor: config.white,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(AppNavigator);
