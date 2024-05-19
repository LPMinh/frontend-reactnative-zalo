import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import getUser from '../api/service/loaduser';
import { call } from '../api/service/message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setChat, setUser } from '../reduxtoolkit/slice/ChatReducer';
import { getMessages } from '../api/service/chat';


export default function HeaderChatScreen({name,avatar,userId,navigation,roomInfo}) {
  const receiver = useSelector(state => state.appChat.receiver);
  const roomId = useSelector(state => state.appChat.roomId);
  const user = useSelector(state => state.appChat.user);
  const dispatch = useDispatch();
  // call audio
  const handleCallAudio = async () => {
      
      const response = await call(user.email,receiver.email,'AUDIO_CALL')
      console.log('response',response);
      fetchMessage();
      return navigation.navigate('call',{"recevier":receiver});
  }
  // cancel call
  const handleReject = async () => {
    const userData = await getUser();
    const response = await call(user.email,receiver.email,'REJECT_CALL')
    fetchMessage();
  }
  
  const fetchMessage = async () => {
    try {
      const data = await getMessages(roomId, user.email);
      dispatch(setChat(data.messages))
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor:'#0895FB', flexDirection:'row', justifyContent:'space-between' ,width:'100%',height:'100%'}]}>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate("tab")}>
            <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} />
          </TouchableOpacity>
          <View style={{ flexDirection:'column', alignItems:'flex-start', justifyContent:'center', marginLeft: 10 }}>
            <Text style={{ fontWeight:'bold', color:'white' }}>{name}</Text>
            <Text style={{ fontWeight:'100', color:'white' }}>online</Text>
          </View>
        </View>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', width:'30%' }}>
          <TouchableOpacity onPress={handleCallAudio}>
            <Image source={require('../images/icon/telephone.png')} style={{ width:30, height:30 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/icon/video.png')} style={{ width:30, height:30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('detailgroup',{"roomInfo":roomInfo})}>
            <Image source={require('../images/icon/list.png')} style={{ width:30, height:30 }} />
          </TouchableOpacity>
        </View>
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
    width: '100%',
    height: '5%', // Đổi chiều cao của container
  },
});
