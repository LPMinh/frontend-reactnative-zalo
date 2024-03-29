import { faEllipsis, faImage, faMagnifyingGlass, faMicrophone, faNoteSticky, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import BoxSticker from './BoxSticker';
import BoxTypeTicker from './BoxTypeTicker';
import { useDispatch, useSelector } from 'react-redux';
import { setEmoji } from '../redux/slice/chatReducer';


export default function FooterBoxChat({onShowBoxSticker}) {
  
  const dispatch = useDispatch();
  const [showBoxSticker,setShowBoxSticker]=useState(false);
  const [showButtonSend,setShowButtonSend]=useState(false);
  const [contextChat, setContextChat]=useState('');
  const handleShowBoxSticker=()=>{
    setShowBoxSticker(!showBoxSticker);
    onShowBoxSticker(!showBoxSticker);
  }
  const emoji = useSelector((state)=>state.appChat.emoji);

  if(emoji){
    setContextChat(contextChat+emoji);
    dispatch(setEmoji(''));
  }
  const handleSendMess=()=>{
    

  }
  
  return (
    <View style={styles.container}>
        <View style={[{ backgroundColor:'#0895FB',flexDirection:'row',height:'80px',width:'100%',justifyContent:'space-between',alignItems:'center'}]}>
             
                        <TouchableOpacity onPress={handleShowBoxSticker}>
                        <FontAwesomeIcon icon={faNoteSticky} size={25} color={'white'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TextInput autoFocus={true}  placeholder="Nhập tin nhắn" style={{color:'white',marginLeft:10,fontSize:15}} onChangeText={setContextChat} value={contextChat} ></TextInput>
  
                        {contextChat.length>0?<TouchableOpacity>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={'white'} style={{marginLeft:10}}></FontAwesomeIcon>
                        </TouchableOpacity>:null
                        }
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
         {showBoxSticker?<BoxSticker/>:null}       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex', 
    position:'absolute',
    bottom:0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'auto'
  },

});