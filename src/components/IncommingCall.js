import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image, SectionList, Alert } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronLeft, faMicrophone, faPhone, faPhoneFlip, faPhoneSlash, faVideo, faVolumeControlPhone, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { acceptCall, rejectCall } from '../api/service/message';
import getUser from '../api/service/loaduser';
import { getMessages } from '../api/service/chat';
import SockJS from 'sockjs-client';
import { baseURLWebSocket } from '../constant/baseURL';
import { over } from 'stompjs';
import { RTCPeerConnection } from 'react-native-webrtc';
import findUserByEmail from '../api/service/user';
// import { mediaDevices } from 'react-native-webrtc';
export default function IncommingCall({navigation,route,isvideocall}) {
const recevier = route.params?.recevier;
const message = route.params?.message;
console.log('message',message);
const stompClient = useRef(null);
useEffect( () => {
  const setupWebSocketConnections =  () => {
    if (stompClient.current) {
      stompClient.current.disconnect(); // Disconnect instead of destroy
    }
    let sock = new SockJS(baseURLWebSocket);
    stompClient.current = over(sock);
    stompClient.current.connect({}, () => {
      console.log('connected');
    });
  };
  setupWebSocketConnections();

  }, []);

const handleAccept= async ()=>{
   try{
    await acceptCall(message.message.id);
    const user = await getUser();
    await stompClient.current.send(`/app/call`, {}, JSON.stringify({callFrom: user.email, callTo: message.message.senderId}));
     console.error('message',message);
     const recevier = await findUserByEmail(message.senderId);
    // Alert('recevier',JSON.stringify(recevier));

    return navigation.navigate('call',{"recevier":recevier});
    //await fetchMessage();
   }catch (error) {
    console.error("Error fetching data: ", error);
   }
    
}
const handleReject= async ()=>{
  alert('reject')
    const response = await rejectCall(message.message.id);
    await fetchMessage();
    return navigation.goBack();
}

const fetchMessage = async () => {
  let user = null;
  try {
    const user = await getUser();
    const data = await getMessages(roomId, user.email);
    dispatch(setChat(data.messages))
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

  return (
    <View style={styles.boxsticker}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.button_header} onPress={()=>navigation.goBack()}>
                <FontAwesomeIcon icon={faChevronLeft} size={30} color='white'/>
            </TouchableOpacity>
            <Text style={{fontSize:40, color:'white',textAlign:'center',lineHeight:0,width:'70%'}}>Zalo</Text>
            <TouchableOpacity style={styles.button_header} onPress={()=>navigation.goBack()}>
                <FontAwesomeIcon icon={faVideo} size={30} color='white'/>
            </TouchableOpacity>
        </View>
        {isvideocall?
        <View style={styles.container_video}>Video Call</View>
        :
        <View style={styles.container_phone}>
            <View style={{width:'100%',height:'50%',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                <Image source={{uri: recevier?.avatar}} style={{width:200,height:200,borderRadius:100}}/>
                <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{recevier?.name}</Text>
                <Text style={{fontSize:20,color:'white'}}>
                  {isvideocall?'Cuộc gọi video...':'Cuộc gọi đến...'}
                </Text>
            </View>
             <View style={{width:'100%',height:'30%',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
             <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity style={styles.button} onPress={handleAccept}>
                     <FontAwesomeIcon icon={faPhoneFlip} size={30} color='white'/>
                 </TouchableOpacity>
                 <Text style={{fontSize:20,color:'white'}}>Trả lời</Text>
             </View>
             <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <TouchableOpacity style={{width:70,height:70,borderRadius:35,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onPress={handleReject}>
                     <FontAwesomeIcon icon={faPhoneSlash} size={30} color='white'/>
                 </TouchableOpacity>
                 <Text style={{fontSize:20,color:'white'}}>Từ chối</Text>
             </View>
            </View>
            
        </View>
        }

    </View>
  );
}

const styles = StyleSheet.create({
  boxsticker: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#0073FF',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
  container_video:{
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0073FF'
  },
  container_phone:{
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-evenly',
    backgroundColor:'#0073FF'
  },
  header:{
    width:'100%',
    height:'5%',
    position:'absolute',
    top:20,
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    zIndex:100
  },
  button_header:{
    padding:10,
    backgroundColor:'gray',
    borderRadius:50,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  button:{
    width:70
    ,height:70,
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green'
  }
});