import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import DiscoveryScreen from './DiscoveryScreen';
import DiaryScreen from './DiaryScreen';
import MyProfileScreen from './MyProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setNotifyAddFriend } from '../reduxtoolkit/slice/NotifyReducer';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import getUser from '../api/service/loaduser';
import { setChat, setListRoom, setUser } from '../reduxtoolkit/slice/ChatReducer';
import { getRooms } from '../api/service/room';
import { getMessages } from '../api/service/chat';
import { findListGroupBySenderId } from '../api/service/group';
import { setListGroup } from '../reduxtoolkit/slice/GroupChatReducer';
import { baseURLWebSocket } from '../constant/baseURL';
import { getAllRequestAddFriendByReciverId, getFriendByUserId } from '../api/service/nofityaddfriend';

function BottomTab({navigation}) {
  const Tab = createBottomTabNavigator();
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const listRoom = useSelector((state) => state.appChat.listRoom);
  const user = useSelector((state) => state.appChat.user);
  const stompClient = useRef(null);
  
  useEffect(() => {
    const initialize = async () => {
      fetchInitialData();
      setupWebSocketConnections();
    };
    initialize();
  }, [reload]);

  const fetchInitialData = async () => {
    await fetchUser();
    await fetchRooms();
    await fetchListFriend();
    await fetchListFriendRequest();
    await fetchGroups();
  };

  const fetchRooms = async () => {
    const rooms = await getRooms(user.email);
    dispatch(setListRoom(rooms.roomResponses));
  };
  const fetchUser = async () => {
    const user = await getUser();
    dispatch(setUser(user));
  };

  const fetchListFriend = async () => {
    try {
      const userParse = await getUser();
      const listFriend = await getFriendByUserId(userParse.email);
      dispatch(setFriends(listFriend));
    } catch (error) {
      console.log('Error fetching friends: ', error);
    }
  };

  const fetchListFriendRequest = async () => {
    try {
      const listFriend = await getAllRequestAddFriendByReciverId(user.email);
      dispatch(setNotifyAddFriend(listFriend));
    } catch (error) {
      console.log('Error fetching friend requests: ', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const groups = await findListGroupBySenderId(user.email);
      dispatch(setListGroup(groups));
      groups.forEach(group => setupGroupWebSocket(group.id));
    } catch (error) {
      console.log('Error fetching groups: ', error);
    }
  };

  const setupWebSocketConnections = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }

    let sock = new SockJS(baseURLWebSocket);
    stompClient.current = over(sock);

    stompClient.current.connect({}, () => {
      setupPrivateWebSocketConnections();
    }, (error) => {
      console.log('Error: ', error);
    });
  };

  const setupPrivateWebSocketConnections = () => {
    stompClient.current.subscribe(`/user/${user.email}/queue/response-friend-request`, (message) => {
      fetchListFriend();
    });

    stompClient.current.subscribe(`/user/${user.email}/queue/messages`, (message) => {
      const data = JSON.parse(message.body);
      if(data?.status === 'CALL_REQUEST'){
        return navigation.navigate('incomingcall', {message: data});
      }else if( data?.status === 'REJECT_CALL'){
        return navigation.goBack();
      }
      setReload(!reload);
    });
    stompClient.current.subscribe(`/user/${user.email}/queue/friend-request`, (message) => {
      fetchListFriendRequest();
    });

  };

  const setupGroupWebSocket = (groupId) => {
    let groupSock = new SockJS(baseURLWebSocket);
    let groupStompClient = over(groupSock);

    groupStompClient.connect({}, () => {
      groupStompClient.subscribe(`/user/${groupId}/queue/message`, (message) => {
        fetchRooms();
      });

      groupStompClient.subscribe(`/user/${groupId}/queue/messages`, (message) => {
        fetchRooms();
      });
    }, (error) => {
      console.log('Group WebSocket error: ', error);
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
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
            <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color={'red'} style={{ marginLeft: 10 }} />
            <TouchableOpacity>
              <Text style={{ color: 'white', marginLeft: 10, fontSize: 15 }}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
        ),
        title: ''
      }}
    >
      <Tab.Screen name="Chat" component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const chatIcon = focused ? require('../images/icon/chat-focus.jpg') : require('../images/icon/chat.jpg');
            return (
              <Image source={chatIcon} style={{ width: 30, height: 30 }} />
            );
          },
          title: 'Tin nhắn'
        }}
      />
      <Tab.Screen name="Contact" component={ContactScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const contactIcon = focused ? require('../images/icon/contact-active.jpg') : require('../images/icon/contact.jpg');
            return (
              <Image source={contactIcon} style={{ width: 30, height: 30 }} />
            );
          },
          title: 'Danh bạ'
        }}
      />
      <Tab.Screen name="Discovery" component={DiscoveryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const discoveryIcon = focused ? require('../images/icon/discovery-active.jpg') : require('../images/icon/discovery.jpg');
            return (
              <Image source={discoveryIcon} style={{ width: 30, height: 30 }} />
            );
          },
          title: 'Khám phá'
        }}
      />
      <Tab.Screen name="Diary" component={DiaryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const diaryIcon = focused ? require('../images/icon/log-active.jpg') : require('../images/icon/log.jpg');
            return (
              <Image source={diaryIcon} style={{ width: 30, height: 30 }} />
            );
          },
          title: 'Nhật Ký'
        }}
      />
      <Tab.Screen name="Profile" component={MyProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const profileIcon = focused ? require('../images/icon/info-active.jpg') : require('../images/icon/info.jpg');
            return (
              <Image source={profileIcon} style={{ width: 30, height: 30 }} />
            );
          },
          title: 'Cá nhân'
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
