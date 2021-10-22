import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ConnectScreen from '../../screens/connect';
const Stack = createStackNavigator();
function ConnectStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen
          name="Connect"
          component={ConnectScreen}   
          options={{
            title: "Kết nối"
          }}       
        />
      </Stack.Navigator>
    )
}
export default ConnectStack;