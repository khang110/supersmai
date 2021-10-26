import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from '../navigation/Tabs';
import personalInfo from "../screens/personalInfo";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
const Stack = createStackNavigator();
function AppNavigator(props) {
    const { navigation, dispatch } = props;
    return (
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
          options={({navigation})=>({
            headerShown: true,
            title: "Trang chủ",
          })}
        />
      </Stack.Navigator>
    );
}
export default AppNavigator;