import { faEllipsis, faImage, faMagnifyingGlass, faMicrophone, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import BoxSticker from './BoxSticker';


export default function FooterBoxChat({onShowBoxSticker}) {
  const [showBoxSticker,setShowBoxSticker]=useState(false);
  const handleShowBoxSticker=()=>{
    setShowBoxSticker(!showBoxSticker);
    onShowBoxSticker(!showBoxSticker);
  }

  return (
    <View style={styles.container}>
        <View style={[styles.wrap,{ backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
             
                        <TouchableOpacity onPress={handleShowBoxSticker}>
                        <FontAwesomeIcon icon={faNoteSticky} size={25} color={'white'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TextInput autoFocus={true}  placeholder="Nhập tin nhắn" style={{color:'white',marginLeft:10,fontSize:15}}></TextInput>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faEllipsis} size={25} color={'white'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faMicrophone} size={25} color={'white'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faImage} size={25} color={'orange'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>
               
        </View>
        
        


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'10%'
  },
  wrap:{
    width:'100%',
    height:'100%',
   
  },
  boxsticker:{
  
    width:'100%',
    height:'300px',
    

  }

});