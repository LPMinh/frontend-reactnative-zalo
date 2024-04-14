import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

export default function HeaderChatScreen({name,avatar,navigation,roomInfo}) {
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
          <TouchableOpacity>
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
