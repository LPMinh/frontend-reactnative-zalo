import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput } from 'react-native';


const saveJWT = async (jwtToken) => {
  try {
    await AsyncStorage.setItem('jwtToken', jwtToken);
    console.log('JWT đã được lưu.');
  } catch (e) {
    console.error('Lỗi khi lưu JWT:', e);
  }
};

const getJWT = async () => {
  try {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    if (jwtToken !== null) {
      console.log('JWT đã được lấy:', jwtToken);
      return jwtToken;
    } else {
      console.log('Không tìm thấy JWT trong AsyncStorage.');
      return null;
    }
  } catch (e) {
    console.error('Lỗi khi lấy JWT:', e);
    return null;
  }
};

const removeJWT = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
    console.log('JWT đã được xóa.');
  } catch (e) {
    console.error('Lỗi khi xóa JWT:', e);
  }
};






export default function LoginScreen({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const userAgent = "mobile"
 
  const login = async  () => {
    try{
      const respone = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'mobile',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          password: password.trim(),
        }),
    
      });
    }catch(e){
      console.error('Lỗi khi đăng nhập:', e);
    }
  }
  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../images/icon/left-arrow.png')} style={{height:'14px',width:'14px'}}></Image> </TouchableOpacity>
            <Text style={{fontSize:14,color:'white',fontWeight:'bold',textAlign:'left',marginLeft:'20px'}}>Đăng nhập</Text>
        </View>
        <View style={styles.content}>
            <Text style={{textAlign:'left'}}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            <View style={{width:'100%',justifyContent:'space-evenly',height:'30%'}}>
                <View style={{borderBottomWidth:1,borderBottomColor:'#0895FB',width:'100%',height:'40px'}}>
                    <TextInput placeholder="Số điện thoại" style={{width:'100%',height:'100%'}} focusable={false} onChangeText={setPhoneNumber} value={phoneNumber}></TextInput>
                </View>

                <View>
                    <TextInput placeholder="Mật khẩu" secureTextEntry={true} style={{borderBottomWidth:1,borderBottomColor:'#0895FB',width:'100%',height:'40px'}} onChangeText={setPassword}></TextInput>
                </View>

                <TouchableOpacity><Text style={{color:'#0895FB'}}>Lấy lại mật khẩu</Text></TouchableOpacity>
                <TouchableOpacity style={{width:'50%',alignSelf:'center',marginTop:'20px'}}  onPress={()=>navigation.navigate('tab')}>
                    <Text style={{backgroundColor:'#0895FB',color:'white',textAlign:'center',width:'100%',height:'40px',lineHeight:'40px',borderRadius:'5px'}}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
   
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%',
    height:'100%'
  },
  header: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%',
    height:'10%',
    backgroundColor:'#0895FB',

  },
    content:{
        display:'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:'90%',
        height:'90%'
    }
 
});