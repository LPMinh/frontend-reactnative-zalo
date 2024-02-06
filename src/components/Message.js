import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Message({item,receiver,user,sender}) {

  console.log(receiver);
  console.log(user)
  function EmotionDropBox({display}){
    return <View style={{display:display==true?'flex':'none',flexDirection:'row', width:'100%',height:'100%',backgroundColor:'#FEFEFE',borderRadius:5,marginTop:10}}>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
                <Text>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
                <Text>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
                <Text>😄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
                <Text>😮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
                <Text>😭</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:'20px',width:'20px'}}>
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
                          <Text style={{fontSize:10,marginTop:'5px'}}>{item.time}</Text>
                          
                      </View>
                      <EmotionDropBox display={falsez}></EmotionDropBox>
                  </View>
        case 'image':
          return <Image source={content} style={{width:200,height:300,resizeMode:'cover',marginLeft:'10px'}}></Image>;
        case 'sticker':
          return 'Đã gửi 1 nhãn dán';
        default:
          return 'Đã gửi 1 tệp';
      }
  }
  return (
    <TouchableOpacity style={{marginBottom:'10px',marginLeft:'10px'}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:user.id == receiver.id ? 'flex-start':'flex-end'}}>
            {user.id == receiver.id ? <Image source={sender.avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}}></Image>:null }{CovertContentMessageByType(item.type,item.content)}

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
   
   
  },
  wrap:{
    
    
   
   
  }
});