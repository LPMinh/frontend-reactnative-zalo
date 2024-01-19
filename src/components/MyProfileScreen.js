import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';

export default function MyProfileScreen() {
  const right = ()=>(
    <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
      <TouchableOpacity>
          <Image source={require('../images/icon/setting.jpg')} style={{width:30,height:30}}></Image>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
       <Header Right={right}/>
       
        <Text>
            My Profile Screen
        </Text>
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
  }
});