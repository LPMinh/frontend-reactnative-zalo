import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function ItemMessage({item,navigation}) {
  console.log(item);
 
  const covertContentMessageByType = (type,content)=>{
      switch(type){
        case 'text':
          return content;
        case 'image':
          return 'Đã gửi 1 ảnh';
        case 'sticker':
          return 'Đã gửi 1 nhãn dán';
        default:
          return 'Đã gửi 1 tệp';
      }
  }
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('chatbox',{receciver:item.user})}>
        <View style={[styles.wrap,{ backgroundColor: item.type==='cloud'?'#F9F9F9':'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                <Image style={{height:'50px',width:'50px',borderRadius:'50%'}} source={item.user.avatar}>
                </Image>
                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{width:'80%',height:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:10}}>
                        <Text style={{fontWeight:item.isSeen===true?'normal':'bold',fontSize:'18px'}}>{item.user.name}</Text>
                        <Text style={{color:item.isSeen===true?"gray":"black",fontWeight:item.isSeen==true?'normal':'bold'}}>{covertContentMessageByType(item.lastMessage.type,item.lastMessage.content)}</Text>
                    </View>
                    <View style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'flex-end'}}>
                        <Text>{item.lastMessageTime}</Text>
                        <Text style={{backgroundColor:'red',borderRadius:'40%',paddingHorizontal:5,color:'#fff'}}>{item.numberMessage}</Text>
                    </View>
                </View>
               
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
    width:'100%',
    height:'100%',
    padding:10
   
  }
});