import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyNewsScreen from "../../screens/mynews";
import config from '../../config/config'
import color from '../../config/color'
const Stack = createStackNavigator();
function MyNewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyNews"
        component={MyNewsScreen}
        options={{
          title: "Tin đăng",
          headerShown: true,
          headerTintColor: color.white,
          headerStyle: {
            backgroundColor: config.main_color,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default MyNewsStack;
