import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import DiscoveryScreen from './DiscoveryScreen';
import DiaryScreen from './DiaryScreen';
import MyProfileScreen from './MyProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faComment, faHouse, faHouseChimneyWindow, faMugSaucer, faPersonWalkingDashedLineArrowRight, faRocket, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Alert, Image, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useWebSocket from 'react-native-use-websocket';
import { connect } from '../api/service/connect';
import { getAllRequestAddFriendByReciverId, getFriendByUserId } from '../api/service/nofityaddfriend';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, addNotifyAddFriend, setFriends, setNotifyAddFriend } from '../reduxtoolkit/slice/NotifyReducer';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import getUser from '../api/service/loaduser';
import { setChat, setListRoom } from '../reduxtoolkit/slice/ChatReducer';
import { getRooms } from '../api/service/room';
import { getMessages } from '../api/service/chat';
import { findListGroupBySenderId } from '../api/service/group';
import { setListGroup } from '../reduxtoolkit/slice/GroupChatReducer';
import { Checkbox } from 'react-native-paper';

function BottomTab() {
     const Tab = createBottomTabNavigator();
     const [reload, setReload] = useState(false);
     const [user, setUser] = useState({});
     const ws = useRef(null);
     const dispatch = useDispatch();
     const listRoom=useSelector((state)=>state.appChat.listRoom);
     const baseURLWebSocket = (Platform.OS === 'web') ? 'http://18.136.207.168/ws' : 'http://18.136.207.168/ws';
     
    useEffect(() => {
     fethListFriend();
     fetchListFriendRequest();
     fetchRooms();
     connect();
     connectNotify();
     connectMessage();
     connectMessageGroup();
     connectListGroup();

   }, [reload]);
  
   
   const fetchRooms = async () => {
     const user = await getUser();
     const rooms = await getRooms(user.email);
     console.log(rooms);
     dispatch(setListRoom(rooms.roomResponses));
   }

   const connectListGroup = async () => {
        const user = await getUser();
        console.log(user);
        const groups = await findListGroupBySenderId(user.email);
        dispatch(setListGroup(groups));
        groups.forEach(group => {
          let sock = new SockJS(baseURLWebSocket);
          const stompClient = over(sock);
          stompClient.connect(
            {},
            function (frame) {
              stompClient.subscribe(
                "/user/" + group.id + "/queue/message",
                function (message) {
                  const mess = JSON.parse(message.body);
                  console.log("message", mess);
                  fetchRooms();
                }
              );
            },
            (error) => {
              console.log("Error: ", error);
            }
          );
        });
        groups.forEach(group => {
          let sock = new SockJS(baseURLWebSocket);
          const stompClient = over(sock);
          stompClient.connect(
            {},
            function (frame) {
              stompClient.subscribe(
                "/user/" + group.id + "/queue/messages",
                function (message) {
                  const mess = JSON.parse(message.body);
                  console.log("message", mess);
                  fetchRooms();
                }
              );
            },
            (error) => {
              console.log("Error: ", error);
            }
          );
        });
        
     }
   const fethListFriend = async () => {
     try {
          const user = await AsyncStorage.getItem('user');
          const userParse = JSON.parse(user);
          const listfriend = await getFriendByUserId(userParse.email);
          console.warn(listfriend);
          dispatch(setFriends(listfriend));
     } catch (error) {
          console.log('Error fetching data: ', error);    
      }

}
   const connect = async () => {
     // let sock = new SockJS("http://localhost:8080/ws");
     let sock = new SockJS(baseURLWebSocket);
     const stompClient = over(sock);
     const user = await getUser();
     stompClient.connect(
       {},
       function (frame) {
         console.log("Connected: " + frame);
         stompClient.subscribe(
           "/user/" + user.email + "/queue/response-friend-request",
           function (message) {
               console.log("message",message);
               alert("Đồng ý kết bạn",message + " đã đồng ý kết bạn với bạn");
              fethListFriend();
              
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

   const listMessage = async () => {
     let user = null;
     try {
       const userData = await AsyncStorage.getItem("user");
       user = JSON.parse(userData);
       const roomId = senderId+'_'+receiverId;
       const data = await getMessages(roomId,receiverId);
       console.warn(roomId);
       
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
   const connectMessage = async () => {
      let sock = new SockJS(baseURLWebSocket);
     //  let sock = new SockJS("http://localhost:8080/ws");
      const stompClient = over(sock);
      const user = await getUser();
      stompClient.connect(
        {},
        function (frame) {
          stompClient.subscribe(
            "/user/" + user.email + "/queue/messages",
            function (message) {
              const mess = JSON.parse(message.body);
                 console.log("message", mess);
                 setReload(!reload);
                 fetchRooms();
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

    const connectMessageGroup = async () => {
     let sock = new SockJS(baseURLWebSocket);
    //  let sock = new SockJS("http://localhost:8080/ws");
     const stompClient = over(sock);
     const user = await getUser();
     stompClient.connect(
       {},
       function  (frame) {
         stompClient.subscribe(
           "/user/" + user.email + "/queue/messages",
           function  (message) {
             const mess = JSON.parse(message.body);
                console.log("message", mess);
               
                  
                  fetchRooms();
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
   const fetchListFriendRequest = async () => {
     try {
           const user = await AsyncStorage.getItem("user");
               const userParse = JSON.parse(user);
               const listFriend = await getAllRequestAddFriendByReciverId(userParse.email);
               console.log(listFriend);
               dispatch(setNotifyAddFriend(listFriend));
     } catch (error) {
           console.log("Error fetching data: ", error);
     }
     };



   const connectNotify = async () => {
     // let sock = new SockJS("http://localhost:8080/ws");
      let sock = new SockJS(baseURLWebSocket);
     const stompClient = over(sock);
     const user = await getUser();
     stompClient.connect(
       {},
       function (frame) {
         console.log("Connected: " + frame);
         stompClient.subscribe(
           "/user/" + user.email + "/queue/friend-request",
           function (message) {
             const friendRequest = JSON.parse(message.body);

             fetchListFriendRequest();
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
    

     


     return (
          <Tab.Navigator
               screenOptions={
                    {
                         headerShown: false,
                         tabBarInactiveTintColor: '#398EFB',
                         tabBarLabelStyle: {
                              fontSize: 15
                         },
                         tabBarStyle: {
                              paddingVertical: 10,
                              marginBottom: 20
                         },
                         headerStyle: {
                              backgroundColor: '#0895FB',
                         },
                         headerLeft: () => (
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                   <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color={'red'} style={{ marginLeft: 10 }}></FontAwesomeIcon>
                                   <TouchableOpacity>
                                        <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Tìm kiếm</Text>
                                   </TouchableOpacity>
                              </View>

                         ),
                         title: ''

                    }
               }
          >
               <Tab.Screen name="Chat" component={ChatScreen}
                    options={{
                         tabBarIcon: ({ focused }) => {
                              const chatIcon = focused ? require('../images/icon/chat-focus.jpg') : require('../images/icon/chat.jpg');
                              return (
                                   <Image source={chatIcon} style={{ width: 30, height: 30 }}></Image>
                              )
                         },
                         title: 'Tin nhắn'


                    }}
               ></Tab.Screen>
               <Tab.Screen name="Contact" component={ContactScreen}
                    options={{
                         tabBarIcon: ({ focused }) => {
                              const contactIcon = focused ? require('../images/icon/contact-active.jpg') : require('../images/icon/contact.jpg');

                              return (
                                   <Image source={contactIcon} style={{ width: 30, height: 30 }}></Image>

                              )
                         },
                         title: 'Danh bạ'

                    }}
               />
               <Tab.Screen name="Discovery" component={DiscoveryScreen}
                    options={{
                         tabBarIcon: ({ focused }) => {
                              const discoveryIcon = focused ? require('../images/icon/discovery-active.jpg') : require('../images/icon/discovery.jpg');
                              return (
                                   <Image source={discoveryIcon} style={{ width: 30, height: 30 }}></Image>

                              )
                         },
                         title: 'Khám phá'
                    }}
               />
               <Tab.Screen name="Diary" component={DiaryScreen}
                    options={{
                         tabBarIcon: ({ focused }) => {
                              const diaryIcon = focused ? require('../images/icon/log-active.jpg') : require('../images/icon/log.jpg');
                              return (
                                   <Image source={diaryIcon} style={{ width: 30, height: 30 }}></Image>

                              )
                         },
                         title: 'Nhật Ký'
                    }}
               />
               <Tab.Screen name="Profile" component={MyProfileScreen}
                    options={{
                         tabBarIcon: ({ focused }) => {
                              const profileIcon = focused ? require('../images/icon/info-active.jpg') : require('../images/icon/info.jpg');
                              return (
                                   <Image source={profileIcon} style={{ width: 30, height: 30 }}></Image>

                              )
                         },
                         title: 'Cá nhân'
                    }}
               />
          </Tab.Navigator>

     )

          ;
}

export default BottomTab;