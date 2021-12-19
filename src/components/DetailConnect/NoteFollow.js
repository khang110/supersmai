import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  EvilIcons,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import config from "../../config/config";
import fontSize from "../../config/fontsize";
import color from "../../config/color";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";

const urlAvatar =
  "https://images.unsplash.com/photo-1633193308927-d95701ab10f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80";
const { width } = Dimensions.get("window");
export default function Message(props) {
  let noteReceiver = props.noteReceiver;
  let noteFinish = props.noteFinish;
  const renderTime = (timeUTC) => {
    let time1 = new Date(timeUTC);
    let hour = time1.getHours() ;
    let minute = time1.getMinutes();
    let day = time1.getUTCDate();
    let month1 = time1.getUTCMonth() + 1;
    let year1 = time1.getUTCFullYear();
    let title = hour + ":" + minute + " - " + day + "/" + month1 + "/" + year1;
    return title;
  };
  const renderAvatarRe = () => {
    if (props.avatarRece != null) {
      return (
        <Avatar
          size={width * 0.07}
          rounded
          source={{
            uri: props.avatarRece,
          }}
          containerStyle={styles.wrapAva}
        />
      );
    } else {
      return (
        <Ionicons
          name="person-circle-outline"
          size={width * 0.07}
          color="#757575"
        />
      );
    }
  };
  const renderAvatarFi = () => {
    if (props.avatarFin != null) {
      return (
        <Avatar
          size={width * 0.07}
          rounded
          source={{
            uri: props.avatarFin,
          }}
          containerStyle={styles.wrapAva}
        />
      );
    } else {
      return (
        <Ionicons
          name="person-circle-outline"
          size={width * 0.07}
          color="#757575"
        />
      );
    }
  };
  const renderNoteReceiver = () => {
    if (noteReceiver != null && noteFinish == null) {
      return (
        <View style={styles.childContainerLeft}>
          <View style={styles.nameAvaLeft}>
            {renderAvatarRe()}
            <Text style={styles.wrapName}>{noteReceiver.name}</Text>
          </View>
          <View style={styles.wrapMess}>
            <View style={styles.wrapTime}>
              <Feather name="clock" size={width * 0.03} color="gray" />
              <Text style={styles.time}>{renderTime(noteReceiver.time)}</Text>
            </View>
            <Text style={styles.message}>{noteReceiver.text}</Text>
          </View>
        </View>
      );
    }
    if (noteReceiver == null && noteFinish != null) {
      return (
        <View style={styles.childContainerLeft}>
          <View style={styles.nameAvaLeft}>
            {renderAvatarFi()}
            <Text style={styles.wrapName}>{noteFinish.name}</Text>
          </View>
          <View style={styles.wrapMess}>
            <View style={styles.wrapTime}>
              <Feather name="clock" size={width * 0.03} color="gray" />
              <Text style={styles.time}>{renderTime(noteFinish.time)}</Text>
            </View>
            <Text style={styles.message}>{noteFinish.text}</Text>
          </View>
        </View>
      );
    }
    if (noteReceiver != null && noteFinish != null) {
      if (noteReceiver.id == noteFinish.id) {
        return (
          <View style={styles.childContainerLeft}>
            <View style={styles.nameAvaLeft}>
            {renderAvatarRe()}
              <Text style={styles.wrapName}>{noteReceiver.name}</Text>
            </View>
            <View style={styles.wrapMess}>
              <View style={styles.wrapTime}>
                <Feather name="clock" size={width * 0.03} color="gray" />
                <Text style={styles.time}>{renderTime(noteReceiver.time)}</Text>
              </View>
              <Text style={styles.message}>{noteReceiver.text}</Text>
              <View style={styles.wrapTime}>
                <Feather name="clock" size={width * 0.03} color="gray" />
                <Text style={styles.time}>{renderTime(noteFinish.time)}</Text>
              </View>
              <Text style={styles.message}>{noteFinish.text}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <>
            <View style={styles.childContainerLeft}>
              <View style={styles.nameAvaLeft}>
              {renderAvatarRe()}
                <Text style={styles.wrapName}>{noteReceiver.name}</Text>
              </View>
              <View style={styles.wrapMess}>
                <View style={styles.wrapTime}>
                  <Feather name="clock" size={width * 0.03} color="gray" />
                  <Text style={styles.time}>{renderTime(noteReceiver.time)}</Text>
                </View>
                <Text style={styles.message}>{noteReceiver.text}</Text>
              </View>
            </View>
            <View style={styles.childContainerRight}>
              <View style={styles.nameAvaRight}>
              {renderAvatarFi()}
                <Text style={styles.wrapName}>{noteFinish.name}</Text>
              </View>
              <View style={styles.wrapMessRight}>
                <View style={styles.wrapTime}>
                  <Feather name="clock" size={width * 0.03} color="gray" />
                  <Text style={styles.time}>{renderTime(noteFinish.time)}</Text>
                </View>
                <View>
                  <Text style={styles.message}>{noteFinish.text}</Text>
                </View>
              </View>
            </View>
          </>
        );
      }
    }
  };
  return <View style={styles.container}>{renderNoteReceiver()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childContainerLeft: {},
  childContainerRight: { alignItems: "flex-end" },
  wrapAva: { marginTop: "1%" },
  nameAvaLeft: {
    flexDirection: "row",
    marginLeft: "4%",
    marginRight: "4%",
    alignItems: "center",
    maxWidth: "70%",
    width: "70%",
  },
  nameAvaRight: {
    flexDirection: "row-reverse",
    marginLeft: "4%",
    marginRight: "4%",
    alignItems: "center",
    maxWidth: "70%",
    width: "70%",
  },
  wrapName: {
    fontSize: fontSize.fontsize_3,
    fontWeight: 'bold',
    marginLeft: "2%",
    marginRight: "2%",
  },
  wrapMess: {
    marginLeft: width * 0.13,
    marginRight: width * 0.13,
    maxWidth: "70%",
    width: "70%",
  },
  wrapMessRight: {
    marginLeft: width * 0.13,
    marginRight: width * 0.13,
    maxWidth: "70%",
    width: "70%",
    alignItems: "flex-end",
  },
  wrapTime: {
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: fontSize.fontsize_5,
    marginLeft: "1%",
    color: "gray",
  },
  message: {
    marginTop: "2%",
    marginBottom: "2%",
    backgroundColor: "#E0E0E0",
    alignSelf: "baseline",
    fontSize: fontSize.fontsize_5,
    borderRadius: 10,
    padding: "2%",
  },
});