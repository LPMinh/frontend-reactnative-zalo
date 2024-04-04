import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Message({item,receiver,user,sender}) {

 
  function EmotionDropBox({display}){
    return <View style={{display:display==true?'flex':'none',flexDirection:'row', width:'100%',height:'100%',backgroundColor:'#FEFEFE',borderRadius:5,marginTop:10}}>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>😄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>😮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>😭</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:20,width:20}}>
                <Text>😡</Text>
            </TouchableOpacity>
           </View>
  }
  const CovertContentMessageByType = (type,content)=>{
      switch(type){
        case 'text':
          return  <View>
                      <View style={{backgroundColor:user.id===sender.id?'#C8EDF6':'#FEFEFE',padding:8,width:'auto',height:'auto',borderRadius:10}}>
                          <Text>{content}</Text>
                          <Text style={{fontSize:10,marginTop:5}}>{item.time}</Text>
                          
                      </View>
                      <EmotionDropBox display={false}></EmotionDropBox>
                  </View>
        case 'image':
          return <Image source={{uri:content}} style={{width:100,height:100,borderRadius:10}}></Image>
        case 'sticker':
          return 'Đã gửi 1 nhãn dán';
        default:
          return 'Đã gửi 1 tệp';
      }
  }
  return (
    <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:user.id == receiver.id ? 'flex-start':'flex-end'}}>
            {user.id == receiver.id ? <Image source={sender.avatar} style={{width:50,height:50, borderRadius:50}}></Image>:null }{CovertContentMessageByType(item.type,item.content)}

        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    alignSelf:'flex-start'
   
   
  },
});