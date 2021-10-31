import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyNewsScreen from '../../screens/mynews';
const Stack = createStackNavigator();
function MyNewsStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen
          name="MyNews"
          component={MyNewsScreen}      
          options={{
            title: "Tin đăng",
          }}    
        />
      </Stack.Navigator>
    )
}
export default MyNewsStack;