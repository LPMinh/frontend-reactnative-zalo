import {
  faEllipsis,
  faImage,
  faMagnifyingGlass,
  faMicrophone,
  faNoteSticky,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import BoxSticker from "./BoxSticker";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { sendMessageImge, sendMessageText } from "../api/service/message";
import * as ImagePicker from "expo-image-picker";
export default function FooterBoxChat({ onShowBoxSticker, info }) {
  const dispatch = useDispatch();
  const [showBoxSticker, setShowBoxSticker] = useState(false);
  
  const [contextChat, setContextChat] = useState("");
  const receciver = info.receiverId;
  const [image, setImage] = useState(null);
  const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

  const handleShowBoxSticker = () => {
    setShowBoxSticker(!showBoxSticker);
    onShowBoxSticker(!showBoxSticker);
  };
  const handleSendMess = async () => {
    const user = await getUser();
    const senderId = user.email;
    const receciverId = receciver;
    const content = contextChat;
    const messageType = "TEXT";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    const id = Math.floor(Math.random() * 1000000);

    try {
      await sendMessageText(
        senderId,
        receciverId,
        content,
        messageType,
        messageStatus,
        hiddenSenderSide
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendImage = async () => {
    const user = await getUser();
    let localUri = image;
    let filename = localUri.split('/').pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    const multipart = { uri: localUri, name: filename, type };
    const senderId = user.email;
    const receciverId = receciver;
    const content = multipart;
    const messageType = "IMAGE";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    const id = Math.floor(Math.random() * 1000000);
    try {
      await sendMessageImge(
        senderId,
        receciverId,
        content,
        messageType,
        messageStatus,
        hiddenSenderSide
      );
    } catch (err) {
      console.error(err);
    }
    setImage(null);
  };


  return (
    <View style={styles.container}>
      {image && (
         <View style={{ width: 200, height: 200 }}>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
          <Button title="Send" onPress={handleSendImage} />
        </View>
      )
      }
      <View
        style={[
          {
            backgroundColor: "#0895FB",
            flexDirection: "row",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}>
        <TouchableOpacity onPress={handleShowBoxSticker}>
          <FontAwesomeIcon
            icon={faNoteSticky}
            size={25}
            color={"white"}
            style={{ marginLeft: 10 }}></FontAwesomeIcon>
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          placeholder="Nhập tin nhắn"
          style={{ color: "white", marginLeft: 10, fontSize: 15 }}
          onChangeText={setContextChat}
          value={contextChat}></TextInput>

        {contextChat.length > 0 ? (
          <TouchableOpacity onPress={handleSendMess}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size={25}
              color={"white"}
              style={{ marginLeft: 10 }}></FontAwesomeIcon>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faEllipsis}
            size={25}
            color={"white"}
            style={{ marginLeft: 10 }}></FontAwesomeIcon>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faMicrophone}
            size={25}
            color={"white"}
            style={{ marginLeft: 10 }}></FontAwesomeIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesomeIcon
            icon={faImage}
            size={25}
            color={"white"}
            style={{ marginLeft: 10 }}></FontAwesomeIcon>
        </TouchableOpacity>
       
      </View>
      {showBoxSticker ? <BoxSticker /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
  },
});
