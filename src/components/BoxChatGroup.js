import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';
import HeaderChatScreen from './HeaderChatScreen';
import { useDispatch, useSelector } from 'react-redux';
import FooterBoxChat from './FooterBoxChat';
import Message from './Message';
import BoxSticker from './BoxSticker';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessages } from '../api/service/chat';
import { addChat, setChat, setListRoom, setReceiver, setUser } from '../reduxtoolkit/slice/ChatReducer';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import getUser from '../api/service/loaduser';
import { getRooms } from '../api/service/room';
import MessageGroup from './MessageGroup';

export default function BoxChatGroupScreen({navigation,route}) {
  const receiverId = route.params.receiverId;
  const senderId = route.params.senderId;
  const avatar = route.params.avatar;
  const name = route.params.name;
  const roomId = route.params.roomId;
  const roomInfo= {receiverId,senderId,avatar,name,roomId};
  console.warn('receiverId',receiverId);
  console.warn('senderId',senderId);
  const [stompClient, setStompClient] = useState(null);
  const [showBoxSticker,setShowBoxSticker]=useState(false);
  const handleShowBoxSticker=()=>setShowBoxSticker(!showBoxSticker);
  const user = useSelector((state) => state.appChat.user);    
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.appChat.messages);
  const baseURLWebSocket = (Platform.OS === 'web') ? 'http://18.136.207.168/ws' : 'http://18.136.207.168/ws';
  const listMessage = async () => {
    let user = null;
    try {
      const userData = await AsyncStorage.getItem("user");
 
      user = JSON.parse(userData);
     
      const data = await getMessages(roomId, user.email);
      if(data.messages.length===0){
       const  data2 = await getMessages(roomId, user.email);
       dispatch(setUser(user));
      dispatch(setReceiver(receiverId));
      return data2;
      }
  
      dispatch(setUser(user));
      dispatch(setReceiver(receiverId));
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      return [];
    }
  };
  
  const fetchData = async () => {
    const data = await listMessage();
    console.log("data", data);
    dispatch(setChat(data.messages));
  };
  
  useEffect(() => {
    const connectAndFetchData = async () => {
      await connect();
      fetchData();

    };
    connectAndFetchData();
    return () => {
      // Dọn dẹp kết nối WebSocket khi unmount
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);
  
  const connect = async () => {
    // let sock = new SockJS("http://10.0.2.2:8080/ws");
    let sock = new SockJS(baseURLWebSocket);
    const stompClient = over(sock);
    stompClientRef.current = stompClient; // Save a reference for cleanup
  
    const user = await getUser();
    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe(
          "/user/" +roomId+ "/queue/messages",
          function (message) {
            console.log("Received: ", message);
            
            fetchData();
          }
        );
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
    
  
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  };


  
  
  const stompClientRef = useRef(null);



  return (
    <View style={styles.ChatScreen}>
        <HeaderChatScreen roomInfo={roomInfo}  name={name} avatar={avatar} navigation={navigation} />
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageGroup navigation={navigation} roomId={roomId} item={item} sender={senderId} receiver={receiverId}  avt={avatar} user={user}  />
          )}
          style={{ width: '100%' ,height:'90%',flexDirection:'column-reverse',backgroundColor:'#E2E9F1'}}
        />
        <FooterBoxChat onShowBoxSticker={setShowBoxSticker} receciverId={receiverId} senderId={senderId}/>
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
    height:'100%',
  

   
  }
});