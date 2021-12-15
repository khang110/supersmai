import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ConnectScreen from "../../screens/connect";
import config from "../../config/config";
import color from "../../config/color";
const Stack = createStackNavigator();
function ConnectStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          title: "Kết nối",
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
export default ConnectStack;
