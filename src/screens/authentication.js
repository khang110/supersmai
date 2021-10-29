import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native";
import { TabView, SceneMap, TabBar, Tabs } from "react-native-tab-view";
import Login from "../components/authentication/login";
import SignUp from "../components/authentication/signup";
import config from "../config/config";


export default function authentication(props) {
  const { navigation } = props;
  const FirstRoute = () => (
    <View style={styles.scene}>
      <Login
        onPress={() => navigation.navigate("Home")}
        navigation={navigation}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <SignUp
        onPress_={() => navigation.navigate("Home")}
        navigation={navigation}
      />
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ĐĂNG NHẬP" },
    { key: "second", title: "ĐĂNG KÝ" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={styles.titleText}>{route.title}</Text>
            )}
            style={{ backgroundColor: "white", tabBarInactiveTextColor: "red" }}
            underlineColor="#000"
            indicatorStyle={{ height: 2, backgroundColor: config.color_btn_1 }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  titleText: {
    color: "black",
    marginVertical: 5,
    fontSize: 15,
  },
});

