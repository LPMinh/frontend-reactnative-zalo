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


export default function BoxTypeTicker({item}) {
  return (
          <View style={{width:'100%',height:'50%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <Text style={{width:'100%'}}>{item.name}</Text>
            <FlatList
            data={item.data}
            style={{width:'100%'}}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item,index})=>{
              return(
                <TouchableOpacity style={{flexWrap:'wrap',width:'25%',height:100,padding:10}}>
                  <Image source={{uri:item.url}} style={{width:'100%',height:'100%',resizeMode:'cover'}}></Image>
                </TouchableOpacity>
              )
            }}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            >
            </FlatList>
            
          </View>
  );
}

const styles = StyleSheet.create({
  ChatScreen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'auto'
   
  }
});