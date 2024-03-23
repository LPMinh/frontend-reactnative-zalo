import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import ItemMessage from './ItemMessage';
import HeaderChatScreen from './HeaderChatScreen';
import { useSelector } from 'react-redux';
import FooterBoxChat from './FooterBoxChat';
import Message from './Message';
import BoxSticker from './BoxSticker';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function BoxChatScreen({navigation,route}) {
  const receciver=route.params.receciver;
  const user=useSelector(state=>state.appChat.user)
  const [showBoxSticker,setShowBoxSticker]=useState(false);
  const handleShowBoxSticker=()=>setShowBoxSticker(!showBoxSticker);
  const listMessage=[
    {
      id:1,
      content:{
        type:'text',
        content:'Hello'
      },
      sender:user,
      receciver:receciver,
      time:'10:00'
    },
    {
      id:2,
      content:{
        type:'image',
        content:'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg'
      },
      sender:receciver,
      receciver:user,
      time:'10:00'
    },
    {
      id:3,
      content:{
        type:'text',
        content:'Nic to meet you'
      },
      sender:user,
      receciver:receciver,
      time:'10:00'
    },
    {
      id:4,
      content:{
        type:'text',
        content:'Nice to meet you too'
      },
      sender:receciver,
      receciver:user,
      time:'10:00'
    },
    {
      id:5,
      content:{
        type:'text',
        content:'How are you?'
      },
      sender:user,
      receciver:receciver,
      time:'10:00'
    },
    {
      id:6,
      content:{
        type:'text',
        content:'I am fine'
      },
      sender:receciver,
      receciver:user,
      time:'10:00'
    },
    {
      id:7,
      content:{
        type:'text',
        content:'Goodbye'
      },
      sender:user,
      receciver:receciver,
      time:'10:00'
    },
    {
      id:8,
      content:{
        type:'text',
        content:'Goodbye'
      },
      sender:receciver,
      receciver:user,
      time:'10:00'
    }

   
  ]

  return (
    <View style={styles.ChatScreen}>
        <HeaderChatScreen receciver={receciver} navigation={navigation} />
        <ScrollView style={{width:'100%'}}>  
              {
                listMessage.map((item,index)=>{
                  return <Message key={index} item={item.content}  sender={item.sender}  receiver={item.receciver} user={user} />
                })
              }
        </ScrollView>
        <FooterBoxChat onShowBoxSticker={setShowBoxSticker}/>
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