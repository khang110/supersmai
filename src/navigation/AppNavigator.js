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
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import config from "../config/config";
import color from '../config/color';
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
            headerTintColor: color.white,
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
            headerTintColor: color.white,
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
            headerTintColor: color.white,
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
            headerTintColor: color.white,
            headerTitleAlign: 'center',
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
            headerTintColor: color.white,
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
            headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
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
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
