import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import { TouchableOpacity } from 'react-native-web';

export default function ContactScreen() {
  const right = ()=>(
    <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
      <TouchableOpacity>
          <Image source={require('../images/icon/add-user.jpg')} style={{width:30,height:30}}></Image>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
        <Header Right={right}/>
        <Text>Contact Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
    height:'100%',
  },


});