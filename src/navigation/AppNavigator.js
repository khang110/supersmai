import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "../navigation/Tabs";
import personalInfo from "../screens/personalInfo";
import settings from "../screens/settings";
import DetailPost from '../screens/detailpost';
import Category from '../screens/category';
import Confirm from '../screens/confirm';
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import config from "../config/config";
import authentication from "../screens/authentication";

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
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="Settings"
          component={settings}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Cài đặt và bảo mật",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="Authentication"
          component={authentication}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Tài khoản",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Chi tiết tin đăng",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Danh mục gửi tặng",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
        <Stack.Screen
          name="Confirm"
          component={Confirm}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Xác nhận gửi tặng",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: config.main_color,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
