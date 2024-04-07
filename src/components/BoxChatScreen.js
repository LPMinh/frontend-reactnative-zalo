import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';
import HeaderChatScreen from './HeaderChatScreen';
import { useDispatch, useSelector } from 'react-redux';
import FooterBoxChat from './FooterBoxChat';
import Message from './Message';
import BoxSticker from './BoxSticker';
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessages } from '../api/service/chat';
import { addChat, setChat, setReceiver, setUser } from '../reduxtoolkit/slice/ChatReducer';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import getUser from '../api/service/loaduser';

export default function BoxChatScreen({navigation,route}) {
  const info=route.params.info;
  const [showBoxSticker,setShowBoxSticker]=useState(false);
  const handleShowBoxSticker=()=>setShowBoxSticker(!showBoxSticker);
  const user = useSelector((state) => state.appChat.user);    
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.appChat.messages);

  const listMessage = async () => {
    let user = null;
    try {
      const userData = await AsyncStorage.getItem("user");
      user = JSON.parse(userData);
      const data = await getMessages(info.roomId, user.email);
      dispatch(setUser(user));
      const receiver = info.receciverId;
    
      
      dispatch(setReceiver(receiver));
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await listMessage();
      dispatch(setChat(data.messages));
      connect();
    };

    fetchData();

    return () => {
      // Dọn dẹp kết nối WebSocket khi unmount
      connect().then(disconnect => disconnect());
    };
  }, []);

  const connect = async () => {
    let sock = new SockJS("http://10.0.2.2:8080/ws");
    const stompClient = over(sock);
    const user = await getUser();
    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe(
          "/user/" + user.email + "/queue/messages",
          function (message) {
            const mess = JSON.parse(message.body);
            dispatch(addChat(mess.message));
          }
        );
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

    return () => {
      stompClient.disconnect();
    };
  };

const getRecevier=()=>{
  
  if(info.sender===true){
    return info.receciverId;
  }
  return info.senderId;
}

  return (
    <View style={styles.ChatScreen}>
        <HeaderChatScreen receciver={info} navigation={navigation} />
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Message item={item} sender={item.senderId} receiver={item.receiverId}  avt={info.avatar} user={user} />
          )}
          style={{ width: '100%' ,width:'100%'}}
        />
        <FooterBoxChat onShowBoxSticker={setShowBoxSticker} info={info}/>
        {/* {
          showBoxSticker?<BoxSticker/>:null
        } */}
        
    </View>
  );
}

const styles = StyleSheet.create({
  ChatScreen: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
   height:'auto'
   
  }
});