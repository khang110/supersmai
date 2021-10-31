import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/profile";
const Stack = createStackNavigator();
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerShown:false,
        title: "Tài khoản",
      }} />
    </Stack.Navigator>
  );
}
export default ProfileStack;
