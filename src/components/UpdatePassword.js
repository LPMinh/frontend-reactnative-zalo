
import { Platform, Alert, Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { changePassword } from '../api/service/passowrd';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UpdatePassword({navigation}) {
const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);
    AsyncStorage.getItem('user').then((user) => {
        setUser(JSON.parse(user));
    }
    );
    useEffect(() => {
        if (currentPassword && newPassword && confirmPassword) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    , [currentPassword, newPassword, confirmPassword]);
    const handleChangePassword = async () => {
        // Add your logic to handle changing password
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới không khớp');
            return;
        }
        // Clear error message if passwords match
        setError('');
        const email = user.email;
        // Add your API call or logic to change password here
        const result = await changePassword(email, currentPassword, newPassword, confirmPassword);
        console.log(result);
        if (result) {
          return navigation.navigate('welcome');
        }
        else {
            setError('Mật khẩu hiện tại không đúng');
        }
    }
    
    return <View style={styles.container}>
        <TouchableOpacity style={{ justifyContent: 'center', width: '100%', height: 60, backgroundColor: '#0085fe' }} onPress={()=>navigation.goBack()}>
            <Image style={{ width: 22, height: 18, left: 10 }} source={require('../images/icon/back.jpg')}></Image>
            <Text style={{ position: 'absolute', left: 50, color: 'white', fontWeight: '500', fontSize: 19 }}>Cập nhập mật khẩu</Text>
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', marginBottom: 20, alignItems: 'center', backgroundColor: '#f9fbfe', height: 60, width: '100%' }}>
            <Text style={{ textAlign: 'center', width: '85%', fontSize: 15, }}>Mật mẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của Bạn</Text>
        </View>

        <TouchableOpacity><Text style={{ top: 15, left: 330, fontSize: 17, fontWeight: '500', color: "gray" }}>HIỆN</Text></TouchableOpacity>
        <Text style={{ fontWeight: '600', fontSize: 16, left: 10, bottom: 5 }}>Mật khẩu hiện tại:</Text>

        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2, marginBottom: 30 }} placeholder='Nhập mật khẩu hiện tại' placeholderTextColor={'gray'} onChangeText={setCurrentPassword}></TextInput>

        <Text style={{ fontWeight: '600', fontSize: 16, left: 10, bottom: 5 }}>Mật khẩu mới:</Text>

        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2, marginBottom: 20 }} placeholder='Nhập mật khẩu mới' placeholderTextColor={'gray'} onChangeText={setNewPassword}></TextInput>


        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2 }} placeholder='Nhập lại mật khẩu mới' placeholderTextColor={'gray'} onChangeText={setConfirmPassword} ></TextInput>
        <Text style={{ color: 'red', fontSize: 15, left: 10, bottom: 5 }}>{error}</Text>

        <TouchableOpacity  style={{ justifyContent: 'center', top: 30, alignSelf: 'center', width: 200, height: 40, backgroundColor: '#0099f9', alignItems: 'center', borderRadius: 20 }} onPress={handleChangePassword}><Text style={{ fontSize: 20, color: 'white', fontWeight: '400' }}>CẬP NHẬP</Text></TouchableOpacity>
    </View>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
    },
    textInput: {
        ...Platform.select({
            android: {
                // Đặt viền dưới của TextInput thành trong suốt
                borderBottomColor: 'transparent',
            },
        }),
    },
})






