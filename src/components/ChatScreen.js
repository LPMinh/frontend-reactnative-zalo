
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';
import getUser from '../api/service/loaduser';
import { getRooms } from '../api/service/room';
import { useDispatch, useSelector } from 'react-redux';
import { setListRoom } from '../reduxtoolkit/slice/ChatReducer';


export default function ChatScreen({ navigation }) {
  const dispatch = useDispatch();
  const  rooms = useSelector((state) => state.appChat.listRoom);
 
  const right = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity>
        <Image
          source={require('../images/icon/qr.jpg')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("creategroup")}>
        <Image
          source={require('../images/icon/add.jpg')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );

  const myCloud = {
    roomId: 1,
   
      name: 'Cloud của tôi',
      avatar: 'https://cdn-icons-png.flaticon.com/256/2525/2525758.png',
   
    lastestMessage:'Hello',
    lastMessageTime: '10:00 AM',
    numberOfUnreadMessage: 1,
    isSeen: true,
    type: 'cloud',
    time:[2024,4,7,10,0,0]
  };
 
  return (
    <View style={styles.ChatScreen}>
      <Header Right={right}  navigation={navigation}/>
      <ScrollView style={{ width: '100%' }}>
        <ItemMessage item={myCloud} />
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.roomId.toString()}
          renderItem={({ item }) => (
            <ItemMessage item={item} navigation={navigation} />

          )}
          style={{ width: '100%', width: '100%' }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ChatScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
