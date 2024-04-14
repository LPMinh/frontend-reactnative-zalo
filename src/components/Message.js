import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Video, ResizeMode } from "expo-av";
import React, { useRef, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { revokeMessages } from "../api/service/message";

export default function Message({ item, receiver, user, sender, avt }) {
  const isSender = user.email !== item.receiverId;
  const [showModal, setShowModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const handleFullScreen = () => {
    setIsFullScreen(true);
  };
 
  function EmotionDropBox({ display }) {
    return (
      <View
        style={{
          display: display == true ? "flex" : "none",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          backgroundColor: "#FEFEFE",
          borderRadius: 5,
          marginTop: 10,
        }}>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>😄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>😮</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>😭</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 20, width: 20 }}>
          <Text>😡</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const handleRevokeMessage = async (messageId) => {
    try {
      await revokeMessages(messageId, receiver);
    } catch (err) {
      console.error(err);
    }
  }

  const CovertContentMessageByType = (type, content) => {
    switch (type) {
      case "TEXT":
        return (
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View
              style={{
                backgroundColor: isSender === true ? "#C8EDF6" : "#FEFEFE",
                padding: 8,
                width: "auto",
                height: "auto",
                borderRadius: 10,
              }}>
              <Text>{content}</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{item.time}</Text>
            </View>
            <EmotionDropBox display={false}></EmotionDropBox>
          </TouchableOpacity>
        );
      case "IMAGE":
        return (
          <Image
            source={{ uri: content.filePath }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              resizeMode: "contain",
            }}></Image>
        );
      case "FILE":
        if (item.content.fileExtension === "pdf") {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "auto",
                flexDirection: "row",
                backgroundColor: "#C8EDF6",
                padding: 10,
              }}
              onPress={() => {
                Linking.openURL(item.content.filePath);
              }}>
              <FontAwesomeIcon icon={faFilePdf} size={30} color={"red"} />
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  maxWidth: "80%",
                  textAlign: "left",
                  width: "80%",
                }}>
                {item.content.filename}
              </Text>
            </TouchableOpacity>
          );
        } else if (
          item.content.fileExtension === "docx" ||
          item.content.fileExtension === "doc"
        ) {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "auto",
                flexDirection: "row",
                backgroundColor: "#C8EDF6",
                padding: 10,
              }}
              onPress={() => {
                Linking.openURL(item.content.filePath);
              }}>
              <FontAwesomeIcon icon={faFileWord} size={30} color={"blue"} />
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  maxWidth: "80%",
                  textAlign: "left",
                  width: "80%",
                }}>
                {item.content.filename}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "auto",
                flexDirection: "row",
                backgroundColor: "#C8EDF6",
                padding: 10,
              }}
              onPress={() => {
                Linking.openURL(item.content.filePath);
              }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  maxWidth: "80%",
                  textAlign: "left",
                  width: "80%",
                }}>
                {item.content.filename}
              </Text>
            </TouchableOpacity>
          );
        }
        case "VIDEO":
        return (
          <View>
            <TouchableOpacity onPress={handleFullScreen}>
              <Video
                ref={video}
                style={styles.video}
                source={{ uri: item.content.filePath }}
                useNativeControls
                resizeMode={isFullScreen ? "cover" : "contain"}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(status)}
              />
              <Text
                style={{ color: "black", fontSize: 14, textAlign: "center" }}>
           
              </Text>
            </TouchableOpacity>
          </View>
        );
          


      case "sticker":
        return <Text>Sticker</Text>;
      default:
        return <Text>Không xác định</Text>;
    }
  };
  return (
    <View style={{ marginBottom: 10, marginLeft: 10 }}>
      {item.messageStatus==='REVOKED'?
        <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isSender === false ? "flex-start" : "flex-end",
        }}>
        {isSender === false ? (
          <Image
            source={{ uri: avt }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        ) : null}
        <View style={{ width: "auto" }}>
          <Text style={{color:'red'}}>Tin nhắn đã bị thu hồi</Text>
        </View>
      </TouchableOpacity>  
      :
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isSender === false ? "flex-start" : "flex-end",
        }}
        onPress={() => setShowModal(true)}>
        {isSender === false ? (
          <Image
            source={{ uri: avt }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        ) : null}
        <View style={{ width: "auto" }}>
          {CovertContentMessageByType(item.messageType, item.content)}
        </View>
      </TouchableOpacity>  
    }
      <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={() => {
          handleRevokeMessage(item.id);
        }}>
        <Text style={styles.buttonText}>Thu Hồi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={() => {
          // Xử lý khi nút "Chuyển Tiếp" được nhấn
        }}>
        <Text style={styles.buttonText}>Chuyển Tiếp</Text>
      </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={()=>setShowModal(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    alignSelf: "flex-start",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mờ nền
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent:'space-between'

  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  }
  ,button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 8,
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  redButton: {
    backgroundColor: 'gray',
  },
  blueButton: {
    backgroundColor: 'gray',
  },
  video: {
    width: "100%",
    height: 300,
  },
});
