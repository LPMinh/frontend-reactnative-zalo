import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';


export default function Header({ Right, getEmailValue,navigation }) {
 

  return (
    <View style={styles.container}>
      <View style={[styles.wrap, { backgroundColor: '#0895FB', flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color={'white'} style={{ marginLeft: 10 }}></FontAwesomeIcon>
          <TouchableOpacity onPress={()=>navigation.navigate('search')}>
             <Text style={{color:'white',marginLeft:10,fontSize:15}}>Tìm kiếm</Text> 
        
          </TouchableOpacity>

        </View>
        <Right />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%'
  },
  wrap: {
    width: '100%',
    height: '100%',

  }
});