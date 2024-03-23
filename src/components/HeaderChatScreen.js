import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';


export default function HeaderChatScreen({receciver,navigation}) {
  console.log(receciver);

  return (
    <View style={styles.container}>
        <View style={[styles.wrap,{ backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'space-between'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                            <Image source={require('../images/icon/left-arrow.png')} style={{width:30,height:30}}></Image>
                        </TouchableOpacity>
                        <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold',color:'white'}}>{receciver.name}</Text>
                            <Text style={{fontWeight:'100',color:'white'}}>{receciver.status}</Text>
                        </View>
                       
                </View>
                <View style={{flexDirection:'row',alignItems:'center',width:'30%',justifyContent:'space-evenly'}}>
                    <TouchableOpacity>
                        <Image source={require('../images/icon/telephone.png')} style={{width:30,height:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../images/icon/video.png')} style={{width:30,height:30}}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../images/icon/list.png')} style={{width:30,height:30}}></Image>
                    </TouchableOpacity>
                </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'absolute',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'10%'
  },
  wrap:{
    width:'100%',
    height:'100%',
   
  }
});