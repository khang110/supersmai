import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import HomeStack from '../navigation/Stack/HomeStack';
import ConnectStack from '../navigation/Stack/ConnectStack';
import MyNewsStack from '../navigation/Stack/MynewsStack';
import ProfileStack from '../navigation/Stack/ProfileStack';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          bottom: 5,
          right: 5,
          left: 5,
          borderRadius: 16,
          position: "absolute",
        },
        tabBarActiveTintColor: '#CAD7FF',
        tabBarInactiveTintColor: '#FFF',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <View style={{backgroundColor: color, padding: 10, borderRadius: 12}}>
              <Feather name="home" size={24} color='#007ACC' />
            </View>
            
          ),
        }}
      />
      <Tab.Screen
        name="ConnetTab"
        component={ConnectStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Kết nối",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{backgroundColor: color, padding: 10, borderRadius: 12}}>
            <Ionicons name="share-social-outline" size={24} color='#007ACC' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyNewsTab"
        component={MyNewsStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Tin đăng",
          tabBarIcon: ({ color }) => (
            <View style={{backgroundColor: color, padding: 10, borderRadius: 12}}>
            <MaterialCommunityIcons
              name="newspaper-variant-multiple"
              size={24}
              color='#007ACC'
            />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <View style={{backgroundColor: color, padding: 10, borderRadius: 12}}>
            <FontAwesome name="user-o" size={24} color='#007ACC' />
            </View>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};
export default Tabs;
