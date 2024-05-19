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
  Alert,
} from "react-native";
import BoxSticker from "./BoxSticker";
import * as DocumentPicker from 'expo-document-picker';
import getUser from "../api/service/loaduser";
import { revokeMessages, sendMessageFile, sendMessageImge, sendMessageText } from "../api/service/message";
import * as ImagePicker from "expo-image-picker";
import { addChat, updateChat } from "../reduxtoolkit/slice/ChatReducer";
import { useDispatch } from 'react-redux';
export default function FooterBoxChat({ onShowBoxSticker, receciverId,senderId }) {
  const getRecevier= async()=>{
      const user = await getUser();
      
      if( user.email === senderId){
        return receciverId;
      }
      return senderId;
  }
  const [showBoxSticker, setShowBoxSticker] = useState(false);

  const [contextChat, setContextChat] = useState("");

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    if(result.assets[0].type==='video'){
      const multipart = { uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].mimeType };
      await handleSendVideo(multipart);
    }else{
       setImage(result.assets[0].uri);
    }
  }
};

const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', 
      copyToCacheDirectory: false, 
    });
     const file = result.assets[0];
     
     const fileSave = {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
      size: file.size,

     }
     if(file.mimeType.includes('video/')){
      await handleSendVideo(fileSave);
     }else{
      await handleSendFile(fileSave);
     }
     
    
  } catch (error) {
    console.error('Error picking document:', error);
  }
};

  const handleShowBoxSticker = () => {
    setShowBoxSticker(!showBoxSticker);
    onShowBoxSticker(!showBoxSticker);
  };
  const handleSendMess = async () => {
    const user = await getUser();
    const senderId = user.email;
    const receciverId = await getRecevier();
    const content = contextChat;
    const messageType = "TEXT";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    const id = Math.floor(Math.random() * 1000000);
    const payload = {
      senderId,
      receciverId,
      content,
      messageType,
      messageStatus,
      hiddenSenderSide,
      id,
    };
    try {
      
      const result=await  sendMessageText(
        senderId,
        receciverId,
        content,
        messageType,
        messageStatus,
        hiddenSenderSide
      );
      dispatch(addChat(result));
      
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
    const receciverId = await getRecevier();
    const content = multipart;
    const messageType = "IMAGE";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    const id = Math.floor(Math.random() * 1000000);
    try {
      const payload = {
        senderId,
        receciverId,
        content,
        messageType,
        messageStatus,
        hiddenSenderSide,
        id,
      };
      const result= sendMessageImge(
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

  const handleSendFile = async (file) => {
    const user = await getUser();
    const senderId = user.email;
    const receciverId = await getRecevier();
    const content = file;
    const messageType = "FILE";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    try {
      const result=await sendMessageFile(
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
  }

  const handleSendVideo = async (file) => {
    const user = await getUser();
    const senderId = user.email;
    const receciverId = await getRecevier();
    const content = file;
    const messageType = "VIDEO";
    const messageStatus = "SENT";
    const hiddenSenderSide = false;
    try {
      const result=await sendMessageFile(
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
  }




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
        <TouchableOpacity onPress={pickDocument}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "5%",
  },
});
