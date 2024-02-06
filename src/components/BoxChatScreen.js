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
        content:'Hello',
        time:'10:00'
      },
      sender:user,
      receciver:receciver,
      
    },
    {
      id:2,
      content:{
        type:'image',
        content:'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        time:'10:00'
      },
      sender:receciver,
      receciver:user,
     
    },
    {
      id:3,
      content:{
        type:'text',
        content:'Nic to meet you',
        time:'10:00'
      },
      sender:user,
      receciver:receciver,
      
    },
    {
      id:4,
      content:{
        type:'text',
        content:'Nice to meet you too',
        time:'10:00'
      },
      sender:receciver,
      receciver:user,
      
    },
    {
      id:5,
      content:{
        type:'text',
        content:'How are you?',
        time:'10:00'
      },
      sender:user,
      receciver:receciver,
     
    },
    {
      id:6,
      content:{
        type:'text',
        content:'I am fine',
        time:'10:00'
      },
      sender:receciver,
      receciver:user,
    },
    {
      id:7,
      content:{
        type:'text',
        content:'Goodbye',
        time:'10:00'

      },
      sender:user,
      receciver:receciver,
      
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
        <ScrollView style={{width:'100%',height:'600px',direction:'inherit',backgroundColor:'#E2E9F1'}}>  
              {
                listMessage.map((item,index)=>{
                  return <Message key={index} item={item.content}  sender={item.sender}  receiver={item.receciver} user={user} />
                })
              }
        </ScrollView>
        <FooterBoxChat onShowBoxSticker={setShowBoxSticker}/>
        {
          showBoxSticker?<BoxSticker/>:null
        }
        
        
    </View>
  );
}

const styles = StyleSheet.create({
  ChatScreen: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
    height:'100%',
   
  }
});