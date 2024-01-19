import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';


export default function ChatScreen() {
  const right = ()=>(
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity>
          <Image source={require('../images/icon/qr.jpg')} style={{width:30,height:30}}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
          <Image source={require('../images/icon/add.jpg')} style={{width:30,height:30}}></Image>
      </TouchableOpacity>
    </View>
  )
  
  return (
    <View style={styles.ChatScreen}>
        <Header Right={right}/>
        <FlatList
        
        
        >

        </FlatList>
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