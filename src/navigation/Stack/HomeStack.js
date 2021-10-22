import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../../screens/home';
const Stack = createStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}   
          options={{
            
            headerShown: false,
          }}      
        />
      </Stack.Navigator>
    )
}
export default HomeStack;