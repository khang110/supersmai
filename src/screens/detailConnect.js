import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import config from "../config/config";
import fontSize from "../config/fontsize";
import color from "../config/color";
import { Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import address from "../../assets/address.png";
import { connect } from "react-redux";
import axios from "axios";
import Chip from "../components/Chips/chipStatus";
import RowDetailConnect from "../components/rows/rowDetailConnect";
import user from "../../assets/user.png";
import DialogConfirm from '../components/Dialog/DialogInput';
import Spinner from 'react-native-loading-spinner-overlay';
import { Root, Popup } from 'popup-ui'
import ModalDetailPost from '../components/Modal/ModalDetailPost';
import NoteMessage from '../components/DetailConnect/NoteFollow';
function DetailConnect(props) {
  const {navigation} = props;
  const [name, setName] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [visibleSuccess, setvisibleSuccess] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [dialogCancel, setDialogCancel] = useState(false);
  let data = props.route.params.data;

  useEffect(() => {
    if (data.PostData.NameAuthor != props.auth.FullName) {
      setName(data.PostData.NameAuthor);
      setAddressDetail(data.SenderAddress);
    }
    if (data.ReceiverUser.FullName != props.auth.FullName) {
      setName(data.ReceiverUser[0].FullName);
      setAddressDetail(data.PostData.address)
    }
    if (data.SenderUser.FullName != props.auth.FullName) {
      setName(data.SenderUser[0].FullName);
      setAddressDetail(data.PostData.address)
    }
  },[])
  const giveFor = async () => {
    setDialogVisible(true)
  };
  const cancel = () => {
    setDialogCancel(true)
  }
const handleCancel = async (text) => {
  setDialogCancel(false);
  setIsLoading(true);
  let body =  { status: "cancel", notefinish: text};
  await axios({
    method: "put",
    url: `https://app-super-smai.herokuapp.com/transaction/update-status?transactionId=${data._id}`,
    data: body,
    headers: {
      Authorization: "bearer " + props.auth.token,
    },
  })
    .then((res) => {
      console.log("???? xong")
    })
    .catch((error) => {
      console.log("Error: ", error);
    
    }).finally(() => {
      setIsLoading(false);
      navigation.navigate("Connect")
    })
}

  const handleDelete = async (text) => {
    setDialogVisible(false);
    setIsLoading(true);
    let body =  { status: "done", notefinish: text};
    await axios({
      method: "put",
      url: `https://app-super-smai.herokuapp.com/transaction/update-status?transactionId=${data._id}`,
      data: body,
      headers: {
        Authorization: "bearer " + props.auth.token,
      },
    })
      .then((res) => {
        console.log("???? xong")
      })
      .catch((error) => {
        console.log("Error: ", error);
      
      }).finally(() => {
        setIsLoading(false);
        navigation.navigate("Connect")
      })
  }
  const checkAvatar = (note) => {
    let avatar;
    if (note != null) {
      if (note.id == data.SenderUser[0].AccountID) {
        avatar = data.SenderUser[0].urlIamge;
        return avatar;
      }
      if (note.id == data.ReceiverUser[0].AccountID) {
        avatar = data.ReceiverUser[0].urlIamge;
        return avatar;
      }
    }
    return avatar;
  };
  const renderNote = () => {
    if (
      data.typetransaction == "Ch??a nh???n" ||
      data.typetransaction == "Ch??a t???ng"
    ) {
      if (data.NoteReceiver == null) {
        return <Text style={{ textAlign: "center" }}>Kh??ng c??</Text>;
      } else {
        let avatarRe = checkAvatar(data.NoteReceiver);
        let avatarFi = checkAvatar(data.NoteFinish);
        return (
          <NoteMessage
            noteReceiver={data.NoteReceiver}
            noteFinish={data.NoteFinish}
            avatarRece={avatarRe}
            avatarFin={avatarFi}
          />
        );
      }
    } else {
      if (data.NoteReceiver == null && data.NoteFinish == null) {
        return <Text style={{ textAlign: "center" }}>Kh??ng c??</Text>;
      } else {
        let avatarRe = checkAvatar(data.NoteReceiver);
        let avatarFi = checkAvatar(data.NoteFinish);
        return (
          <NoteMessage
            noteReceiver={data.NoteReceiver}
            noteFinish={data.NoteFinish}
            avatarRece={avatarRe}
            avatarFin={avatarFi}
          />
        );
      }
    }
  };
  const renderButtonBottom = () => {
    if (data.typetransaction.includes("Ch??a")) {
      return (
        <View style={styles.wrapButtonBottom}>
        <TouchableOpacity style={{ padding: "4%" }} onPress={() => cancel()}>
          <Text style={styles.textBad}>H???y</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapButtonMessage} onPress={() => giveFor()}>
          <Text style={styles.textGive}>X??c nh???n xong</Text>
        </TouchableOpacity>
      </View>
      )
    } else return;
  }
  return (
   <Root>
    <ScrollView contentContainerStyle={styles.container}>
     <View>
     <View style={{ marginLeft: "4%" }}>
        <Text style={styles.title}>Ng?????i nh???n</Text>
      </View>
      <View style={styles.wrapInfor}>
        <Avatar
          size={config.screen_width * 0.1}
          source={user}
          avatarStyle={{ borderRadius: 20 }}
        />
        <View style={styles.wrapName}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.cate}>C?? nh??n</Text>
        </View>
      </View>
      <View style={styles.wrapAddress}>
        <Image source={address} style={styles.iconAddress} />
        <Text
          style={[styles.cate, { marginTop: "2%", marginLeft: "2%" }]}
          numberOfLines={2}
        >
         {addressDetail}
        </Text>
      </View>
      <View style={styles.wrapInforTrans}>
        <Text style={styles.title}>Th??ng tin t???ng</Text>
        <Chip status={data.isStatus} typetransaction={data.typetransaction} />
      </View>
      <View>
        <RowDetailConnect data={data.PostData} onPress={() => setModalDetail(true)}/>
      </View>
      <View style={styles.wrapNote}>
        <Text style={styles.title}>Ghi ch??</Text>
        <Text style={styles.textNote}>{data.note}</Text>
      </View>
      <View style={styles.wrapNote}>
        <Text style={styles.title}>Theo d??i</Text>
        {renderNote()}
      </View>
      <DialogConfirm title="X??c nh???n xong"
       visible={dialogVisible} handleDelete={handleDelete} handleCancel={() => setDialogVisible(false)}/>
        <DialogConfirm title="X??c nh???n h???y"
       visible={dialogCancel} handleDelete={handleCancel} handleCancel={() => setDialogCancel(false)}/>
      <Spinner
        visible={isloading}
        textContent={"??ang x??? l??..."}
        textStyle={styles.spinnerTextStyle}
      />
       <ModalDetailPost data={data.PostData} closeModal={() => {setModalDetail(false)}} visible={modalDetail}/>
    
     </View>

      {renderButtonBottom()}
    </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: '#FFF'
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSize.fontsize_2,
    color: color.gray_2,
  },
  wrapInfor: {
    flexDirection: "row",
    marginTop: "1%",
    borderColor: "#EEEEEE",
    borderBottomWidth: 2,
    paddingTop: "1%",
    paddingBottom: "1%",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  wrapName: {
    marginLeft: "4%",
    marginBottom: "2%",
    width: "80%",
  },
  name: { fontSize: fontSize.fontsize_4, fontWeight: "bold" },
  cate: { fontSize: fontSize.fontsize_4, color: color.gray_3, maxWidth: "90%" },
  wrapAddress: {
    flexDirection: "row",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderColor: "#EEEEEE",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderBottomWidth: 2,
  },
  iconAddress: {
    width: config.screen_width * 0.06,
    height: config.screen_width * 0.06,
  },
  wrapInforTrans: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "4%",
    marginRight: "4%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  wrapNote: {
    paddingLeft: "4%",
    paddingBottom: "2%",
    borderColor: "#EEEEEE",
    paddingTop: "2%",
    borderBottomWidth: 2,
  },
  textNote: {
    fontSize: fontSize.fontsize_4,

    marginRight: "2%",
  },
  wrapButtonBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
  },
  textBad: { fontSize: fontSize.fontsize_3, color: color.red },
  textGive: { color: '#FFF', fontSize: fontSize.fontsize_2 },
  wrapButtonMessage: {
    flexDirection: "row",
    padding: "4%",
    justifyContent: "center",
    backgroundColor: color.main_color,
    borderRadius: 30,
    alignItems: "center",
  },
});

export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth };
})(DetailConnect);
