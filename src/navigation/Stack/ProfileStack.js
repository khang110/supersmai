import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/profile";
import config from '../../config/config'
import color from '../../config/color'
const Stack = createStackNavigator();
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerShown:true,
        headerTintColor: color.white,
            headerStyle: {
              backgroundColor: config.main_color,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
        title: "Tài khoản",
      }} />
    </Stack.Navigator>
  );
}
export default ProfileStack;
