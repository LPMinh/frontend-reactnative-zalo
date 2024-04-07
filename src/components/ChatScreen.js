import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';
import fetchData from '../api/service/listRooms_SenderID'
import React, { useState, useEffect } from 'react';

export default function ChatScreen({ navigation }) {
  const right = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity>
        <Image
          source={require('../images/icon/qr.jpg')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require('../images/icon/add.jpg')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );

  const myCloud = {
    id: 1,
    user: {
      name: 'Cloud của tôi',
      avatar: 'https://cdn-icons-png.flaticon.com/256/2525/2525758.png',
    },
    lastMessage: {
      type: 'text',
      content: 'Hello',
    },
    lastMessageTime: '10:00 AM',
    numberMessage: 1,
    isSeen: true,
    type: 'cloud',
  };

  const data = [
    {
      id: 2,
      user: {
        id: 1,
        name: 'Nguyen Van A',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8e0Ojr4mmgcCngpEdzD9cLKBv6ookE9eXA&usqp=CAU',
        status: 'Vừa truy cập',
      },
      lastMessage: {
        type: 'image',
        content:
          'https://i.pinimg.com/originals/0a/5b/2a/0a5b2a5f3f0f3d7c1b8a1d1a0e7e3a5c.jpg',
      },
      lastMessageTime: '10:00 AM',
      numberMessage: 1,
      isSeen: true,
    },
    {
      id: 3,
      user: {
        id: 2,
        name: 'Nguyen Van B',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8e0Ojr4mmgcCngpEdzD9cLKBv6ookE9eXA&usqp=CAU',
        status: 'Vừa truy cập',
      },
      lastMessage: {
        type: 'text',
        content: 'Hello',
      },
      lastMessageTime: '10:00 AM',
      numberMessage: 1,
      isSeen: false,
    },
    {
      id: 4,
      user: {
        id: 3,
        name: 'Nguyen Van C',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8e0Ojr4mmgcCngpEdzD9cLKBv6ookE9eXA&usqp=CAU',
        status: 'Truy cập 10 phút trước',
      },
      lastMessage: {
        type: 'audio',
        content:
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      lastMessageTime: '10:00 AM',
      numberMessage: 1,
      isSeen: true,
    },
    {
      id: 5,
      user: {
        id: 4,
        name: 'Nguyen Van D',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8e0Ojr4mmgcCngpEdzD9cLKBv6ookE9eXA&usqp=CAU',
        status: 'Truy cập 10 phút trước',
      },
      lastMessage: {
        type: 'sticker',
        content:
          'https://i.pinimg.com/originals/0a/5b/2a/0a5b2a5f3f0f3d7c1b8a1d1a0e7e3a5c.jpg',
      },
      lastMessageTime: '10:00 AM',
      numberMessage: 1,
      isSeen: true,
    },
  ];

  return (
    <View style={styles.ChatScreen}>
      <Header Right={right} />

      <ScrollView style={{ width: '100%' }}>
        <ItemMessage item={myCloud} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
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
