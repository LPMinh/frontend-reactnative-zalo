import {
  faArrowRight,
  faArrowRightRotate,
  faClose,
  faEdit,
  faFile,
  faFilePdf,
  faFileWord,
  faForward,
  faMagnifyingGlass,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { forwardMessage, revokeMessages } from "../api/service/message";

import getUser from "../api/service/loaduser";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import { extractName, getColorForName } from "../api/service/ExtractUserName";


export default function MessageGroup({ item, receiver, user, sender, avt,roomId,navigation }) {
  const isSender = user.email === item.senderId;
  
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 200, height: 400 });
  const [showForwardModal, setShowForwardModal] = useState(false);
  const friendFromRedux = useSelector((state) => state.notifyAddFriend.friendList);
  const [memberSelected,setMemberSelected]=useState([]);
  const [itemSelected, setItemSelected] = useState([]);
 
  const dispatch = useDispatch();
  const handleSelectMember=(email)=>{
      if(isSelected(email)){
          setMemberSelected(memberSelected.filter(item=>item!==email));
      }else{
          setMemberSelected([...memberSelected,email]);
      }
  }

  const isSelected=(id)=>{
    return memberSelected.includes(id);
}
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handleForwardPress = () => {
    setShowForwardModal(true);
  };
  const handlePosition = () =>{
    if(item.messageType === "SYSTEM"){
      return 'center';
    }else if(isSender){
      return 'flex-end';
    }else{
      return 'flex-start';
    
    }
  }
  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      if (isFullScreen) {
        setVideoSize({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
      } else {
        setVideoSize({ width: 200, height: 400 });
      }
    });
  }, [isFullScreen]);
 
  const [showModal, setShowModal] = useState(false);

  const handleForwardMessage = async () => { 
    try {
      const user= await getUser();
      const messageId=item.id;
      const senderId=user.email;
      const receiversId=memberSelected;
      await forwardMessage(senderId,receiversId,messageId);
      Alert.alert("Chuyển tiếp tin nhắn thành công");
    } catch (err) {
      console.error(err);
    }
  };
 
  const handleRevokeMessage = async (messageId) => {
    try {
      const user= await getUser();
     
      await revokeMessages(messageId, roomId,user.email);
      
    } catch (err) {
      console.error(err);
    }
  };

  const CovertContentMessageByType = (type, content) => {
    switch (type) {
      case "TEXT":
        return (
          <View onPress={() => setShowModal(true)}>
            <View
              style={{
                backgroundColor: isSender === true ? "#C8EDF6" : "white",
                width: "auto",
                height: "auto",
                borderRadius: 10,
              }}>
              <Text>{content}</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{item.time}</Text>
            </View>
          </View>
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
                Linking.openURL(item.content?.filePath);
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
              <FontAwesomeIcon icon={faFile} size={30} color={"blue"} />
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
            
            <TouchableOpacity onPress={toggleFullScreen}>
              <Video
                ref={video}
                style={{ width: isFullScreen ? Dimensions.get('window').width : videoSize.width, height: isFullScreen ? Dimensions.get('window').height : videoSize.height,alignSelf:isFullScreen ? "center" : "flex-start"}}
                source={{ uri: item.content.filePath }}
                useNativeControls
                resizeMode={isFullScreen ? "cover" : "contain"}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
            </TouchableOpacity>
            <FontAwesomeIcon icon={faEdit} style={{color:'black',fontSize:20}}/>
          </View>
        );

      case "SYSTEM":
        return (<Text style={{ color: "gray" ,textAlign:'center'}}>{item.content}</Text>)
      default:
        return <Text>Không xác định</Text>;
    }
  };
  return (
    <View style={{ marginLeft: 10, marginBottom: 10 }}>
      {item.messageStatus === "REVOKED" ? (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: isSender === false ? "flex-start" : "flex-end",
          }}>
          {isSender === false && item.senderAvatar && (
            <Image
              source={{ uri: item?.senderAvatar }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            
          ) }
          {
            isSender === false && item.senderAvatar == null && (
              <View style={{height:50,width:50,borderRadius:50,backgroundColor:getColorForName(item.senderName),justifyContent:'center',alignItems:'center'}}>
                    <Text >{extractName(item.senderName)}</Text>
              </View>
              )
          }
          <View style={{ width: "auto", backgroundColor: "white" }}>
            <Text style={{ color: "red" }}>Tin nhắn đã bị thu hồi</Text>
          </View>
        </TouchableOpacity>
      ) : (

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: handlePosition(),
          }}
          onPress={() => setShowModal(true)}>
          {isSender === false && item.senderAvatar && (
            <Image
              source={{ uri: item?.senderAvatar }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            
          ) }
          {
            isSender === false && item.senderAvatar == null && item.messageType != 'SYSTEM' && (
              <View style={{height:50,width:50,borderRadius:50,backgroundColor:getColorForName(item.senderName),justifyContent:'center',alignItems:'center'}}>
                    <Text >{extractName(item.senderName)}</Text>
              </View>
              )
          }
          <TouchableOpacity
            style={{
              width: "auto",
              alignItems: "flex-start",
              marginLeft: 10,
              backgroundColor: isSender ? "#C8EDF6" : "white",
              borderRadius: 10,
              padding: 10,
            }}
            onPress={() => setShowModal(true)}
            >
            {!isSender && (
              <Text style={{ color: "orange", fontSize: 9 }}>
                {item.senderName}
              </Text>
            )}
            <View>
            {CovertContentMessageByType(item.messageType, item.content)}
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
           {isSender === true && 
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={() => {
                handleRevokeMessage(item.id);
              }}>
                <FontAwesomeIcon icon={faArrowRightRotate} style={{color:'white',fontSize:20}}/>
              <Text style={styles.buttonText}>Thu Hồi</Text>
            </TouchableOpacity>
          }
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={setShowForwardModal}
            >
                <FontAwesomeIcon icon={faForward} style={{color:'white',fontSize:20}}/>
              <Text style={styles.buttonText}>Chuyển Tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.blueButton,{backgroundColor:'red'}]}
              onPress={() => 
              setShowModal(false)
              }>
              <FontAwesomeIcon icon={faClose} style={{color:'white',fontSize:20}}/>
              
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
      <Modal visible={showForwardModal} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
     
 
           
            <View style={{width:'100%',backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>Danh Sách Bạn Bè</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10}}>
               <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'black',fontSize:20}}/>
                <TextInput style={{width:'70%',height:50,backgroundColor:'white',borderRadius:5}} placeholder='nội dung'/>
            </View>   
            <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}> 
                <FlatList
                
                data={friendFromRedux}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10 }}>
                        <TouchableOpacity style={{width:30,height:30,borderRadius:50,borderWidth:1,backgroundColor:isSelected(item.email)?'gray':'white' }}  onPress={()=>{handleSelectMember(item.email)}}></TouchableOpacity>
                        <Image source={{uri:item.avatar}} style={{width:50,height:50,borderRadius:50,marginLeft:20}}/>
                        <Text style={{marginLeft:10}}>{item.name}</Text>
                    </View>

                )}
                />
            </View>
            <TouchableOpacity style={{width:'100%',height:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} onPress={handleForwardMessage} >
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Chuyển Tiếp</Text>
            </TouchableOpacity>
      
      
      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={() => setShowForwardModal(false)}>
        <FontAwesomeIcon icon={faClose} style={{ color: 'white', fontSize: 20 }} />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Mờ nền
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 8,
    alignItems: "center",
    display: "flex",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  redButton: {
    backgroundColor: "gray",
  },
  blueButton: {
    backgroundColor: "gray",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
  modalVideoContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenVideo: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
