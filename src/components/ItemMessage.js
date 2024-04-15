import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getUser from '../api/service/loaduser';
import { extractName, getColorForName } from '../api/service/ExtractUserName';


export default function ItemMessage({item,navigation}) {
  const [user,setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();

  }, []);

  const convertTime = (time)=>{
    let arr=Array.from(time);
    let date= arr[0]+'-'+arr[1]+'-'+arr[2]
    let hour= arr[3].toString()+arr[4].toString();
    let minute= arr[5];
    let datetime = date+' '+hour+':'+minute;

    return datetime
  }
  const getRecevier = (item)=>{
    if(item.sender===true){
      return item.receiverId;
    }else{
      return item.senderId;
    
    }
  }
  const getSender = (item)=>{
    if(item.sender===true){
      return item.senderId;
    }else{
      return item.receiverId;
    
    }
  }

  
  return (
    <View style={styles.container}>
      {item.roomType==='GROUP_CHAT'?
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('chatboxgroup',{receiverId:getRecevier(item),senderId:getSender(item),avatar:item?.avatar,name:item?.name,roomId:item?.roomId})}>
        <View style={[styles.wrap,{ backgroundColor: item.type==='cloud'?'#F9F9F9':'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                {/* <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/> */}
                {item.avatar ? <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/>:
                <View style={{height:50,width:50,borderRadius:50,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                      <Text >{extractName(item.name)}</Text>
                </View>}
                
                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'80%',height:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:10}}>
                        <Text style={{fontWeight:item.sender===true?'normal':'bold',fontSize:18}}>{item.name}</Text>
                        <Text style={{color:item.sender===true?"gray":"black",fontWeight:item.sender==true?'normal':'bold'}}>{item.latestMessage}</Text>
                    </View>
                    <View style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'flex-end'}}>
                        <Text>{convertTime(item.time)}</Text>
                        {item.numberOfUnreadMessage>0?<Text style={{backgroundColor:'red',borderRadius:40,paddingHorizontal:5,color:'#fff'}}>{item.numberOfUnreadMessage}</Text>:<></>}
                    </View>
                </View>
               
        </View>
    </TouchableOpacity>
    :
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('chatbox',{receiverId:getRecevier(item),senderId:getSender(item),avatar:item?.avatar,name:item?.name,roomId:item?.roomId})}>
    <View style={[styles.wrap,{ backgroundColor: item.type==='cloud'?'#F9F9F9':'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                {item.avatar ==null ? <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/>:
                <View style={{height:50,width:50,borderRadius:50,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                      <Text >{extractName(item.name)}</Text>
                </View>}
            
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{width:'80%',height:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:10}}>
                    <Text style={{fontWeight:item.isSeen===true?'normal':'bold',fontSize:18}}>{item.name}</Text>
                    <Text style={{color:item.isSeen===true?"gray":"black",fontWeight:item.isSeen==true?'normal':'bold'}}>{item.latestMessage}</Text>
                </View>
                <View style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'flex-end'}}>
                    <Text>{convertTime(item.time)}</Text>
                    <Text style={{backgroundColor:'red',borderRadius:40,paddingHorizontal:5,color:'#fff'}}>{item.numberOfUnreadMessage}</Text>
                </View>
            </View>
           
    </View>
</TouchableOpacity>}
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
   
   
  },
  wrap:{
    width:'100%',
    height:100,
    padding:10
   
  }
});