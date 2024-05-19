// Import các thư viện và thành phần cần thiết
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../api/service/chat';
import { setChat, setListRoom, setReceiver, setRoomId, setUser } from '../reduxtoolkit/slice/ChatReducer';
import { getRooms } from '../api/service/room';
import { baseURLWebSocket } from '../constant/baseURL';
import findUserByEmail from '../api/service/user';
import { sendCallMessage } from '../api/service/call';
import HeaderChatScreen from './HeaderChatScreen';
import Message from './Message';
import FooterBoxChat from './FooterBoxChat';
import getUser from '../api/service/loaduser';

// Định nghĩa hàm BoxChatScreen với props là navigation và route
export default function BoxChatScreen({ navigation, route }) {
  // Khai báo các biến nhận giá trị từ route.params
  const receiverId = route.params.receiverId;
  const senderId = route.params.senderId;
  const avatar = route.params.avatar;
  const name = route.params.name;
  const roomId = route.params.roomId;

  // Sử dụng useSelector để lấy dữ liệu từ Redux store
  const receiver = useSelector((state) => state.appChat.receiver);
  const [showBoxSticker, setShowBoxSticker] = useState(false);
  const user = useSelector((state) => state.appChat.user);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.appChat.messages);
  // Sử dụng useRef để tham chiếu đến FlatList
  const flatListRef = useRef(null);

  // Hàm fetchData để lấy dữ liệu tin nhắn từ API
  const fetchData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);
      const data = await getMessages(roomId, user.email);
      dispatch(setChat(data.messages));
      dispatch(setUser(user));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };
  const fetchRooms = async () => {
    const userData = await getUser();
    const rooms = await getRooms(userData.email);
    dispatch(setListRoom(rooms.roomResponses));
  };
  // Hàm kết nối WebSocket và lắng nghe tin nhắn mới
  const connectWebSocket = async () => {
    // Kết nối tới WebSocket server
    let sock = new SockJS(baseURLWebSocket);
    const stompClient = over(sock);
    const user = await getUser(); 
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        "/user/" + user.email + "/queue/messages",
        function (message) {
          fetchData();
          fetchRooms();
        }
      );
    }, (error) => {
      console.log("Error: ", error);
    });

  };

  // Hàm useEffect để kết nối WebSocket và fetch dữ liệu tin nhắn khi component được mount
  useEffect(() => {
    const fetchReceiver = async () => {
      const receiver = await findUserByEmail(receiverId); // Hàm findUserByEmail chưa được định nghĩa
      dispatch(setReceiver(receiver));
    };
    fetchReceiver();
    fetchData();
    dispatch(setRoomId(roomId));
    connectWebSocket();
  }, []);

  // Hàm useEffect để scroll xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hàm scrollToBottom để scroll xuống dưới cùng của FlatList
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Trả về giao diện của BoxChatScreen
  return (
    <View style={styles.ChatScreen}>
      <HeaderChatScreen name={name} avatar={avatar} navigation={navigation} />
      <FlatList
        data={messages}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message item={item} sender={senderId} receiver={receiverId} avt={avatar} user={user} />
        )}
        style={{ width: '100%', height: '70%', flexDirection: 'column-reverse' }}
      />
      <FooterBoxChat onShowBoxSticker={setShowBoxSticker} receciverId={receiverId} senderId={senderId} />
    </View>
  );
}

// Định nghĩa kiểu dữ liệu và giao diện cho BoxChatScreen
const styles = StyleSheet.create({
  ChatScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto'
  }
});
