

import { Platform, Alert, Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AccountAndSecurity({ navigation }) {
    const [user, setUser] = useState({});
    AsyncStorage.getItem('user').then((user) => {
        setUser(JSON.parse(user));
    });

    const handleLogout = () => {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        navigation.navigate('welcome');
    }
    return <View style={styles.container}>
        {/* Header tài khoản bảo mật */}
        <TouchableOpacity style={{ justifyContent: 'center', width: '100%', height: 60, backgroundColor: '#0085fe' }}>
            <Image style={{ width: 22, height: 18, left: 10 }} source={require('../images/icon/back.jpg')}></Image>
            <Text style={{ position: 'absolute', left: 50, color: 'white', fontWeight: '500', fontSize: 19 }}>Tài khoản và bảo mật</Text>
        </TouchableOpacity>
        <ScrollView style={{width:'100%'}}>
        <Text style={{ top: 10, color: '#2455a1', fontSize: 17, fontWeight: '600' }}> Tài khoản</Text>

        {/* button thong tin ca nnhan */}
        <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'gray', width: '90%', height: 100, alignSelf: 'center', borderRadius: 10, top: 25, alignItems: 'center' }} onPress={()=>navigation.navigate('detailmyprofile')} >
            {/* <Image style={{ resizeMode: 'center', width: 70, height: 60, left: 10 }} source={require('../images/icon/avatar.jpg')}></Image> */}
            {user?.avatar ? <Image style={{ resizeMode: 'center', width: 70, height: 60, left: 10 }} source={{ uri: user?.avatar }}></Image> : <Image style={{ resizeMode: 'center', width: 70, height: 60, left: 10 }} source={require('../images/icon/avatar.jpg')}></Image>}
            <View style={{ left: 10, top: -10 }}>
                <Text style={{ top: 10, color: 'gray', fontSize: 17, fontWeight: '400' }}> Thông tin cá nhân</Text>
                <Text style={{ top: 10, color: 'black', fontSize: 17, fontWeight: '600' }}>{user?.name}</Text>
            </View>
            <Image style={{ width: 10, height: 15, left: 110 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 100, alignSelf: 'center', top: 25, alignItems: 'center' }}>
            <Image style={{ resizeMode: 'center', width: 30, height: 26, left: 10, margin: 5 }} source={require('../images/icon/phone.jpg')}></Image>
            <View style={{ left: 10, top: -13 }}>
                <Text style={{ top: 10, fontSize: 18, fontWeight: '450' }}>Email</Text>
                <Text style={{ top: 10, color: 'gray', fontSize: 17, }}>{user?.email}</Text>
            </View>
            <Image style={{ width: 10, height: 15, left: 190 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 10, width: "100%", height: 1, backgroundColor: "#d4d4d4", marginLeft: 55, marginBottom: 10 }}></View>

        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', width: '100%', height: 50 }}>
            <Image style={{ resizeMode: 'center', width: 30, height: 26, left: 10, margin: 10 }} source={require('../images/icon/account identification.jpg')}></Image>
            <Text style={{ fontSize: 18, fontWeight: '450' }}> Định danh tài khoản</Text>
            <Text style={{ left: 40, fontSize: 15, color: "#181818" }}>Chưa định danh</Text>
            <Image style={{ width: 10, height: 15, left: 50 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 5, width: "100%", height: 1, backgroundColor: "#d4d4d4", marginLeft: 55, marginBottom: 10 }}></View>

        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', width: '100%', height: 50 }}>
            <Image style={{ resizeMode: 'center', width: 30, height: 26, left: 10, margin: 10 }} source={require('../images/icon/myQR.jpg')}></Image>
            <Text style={{ fontSize: 18, fontWeight: '450' }}> Mã QR của tôi</Text>
            <Text style={{ left: 40, fontSize: 15, color: "#181818" }}>Mã QR của tôi</Text>
            <Image style={{ width: 10, height: 15, left: 55 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 5, width: "100%", height: 7, backgroundColor: "#d4d4d4", marginBottom: 10 }}></View>

        <Text style={{ top: 10, color: '#2455a1', fontSize: 17, fontWeight: '600' }}> Bảo mật</Text>

        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 100, alignSelf: 'center', top: 0, alignItems: 'center' }}>
            <Image style={{ resizeMode: 'center', width: 30, height: 26, left: 10, margin: 5 }} source={require('../images/icon/phone.jpg')}></Image>
            <View style={{ left: 10, top: -13 }}>
                <Text style={{ top: 10, fontSize: 18, fontWeight: '450' }}> Kiểm tra bảo mật</Text>
                <Text style={{ top: 10, color: '#e4ac07', fontSize: 17, }}> 2 vấn đề bảo mật cần xử lý</Text>
            </View>

            <Image style={{ resizeMode: 'cover', width: 20, height: 20, left: 80 }} source={require('../images/icon/Security warning.jpg')}></Image>

            <Image style={{ width: 10, height: 15, left: 105 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', width: '100%', height: 50 }}>
            <Image style={{ resizeMode: 'center', width: 30, height: 26, left: 10, margin: 10 }} source={require('../images/icon/clock zalo.jpg')}></Image>
            <Text style={{ fontSize: 18, fontWeight: '450' }}> Khóa Zalo</Text>
            <Text style={{ left: 160, fontSize: 17, color: "gray" }}>Đang tắt</Text>
            <Image style={{ width: 10, height: 15, left: 170 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>
        <Text style={{ top: 10, color: '#2455a1', fontSize: 17, fontWeight: '600' }}> Đăng nhập</Text>



        <TouchableOpacity style={{ top: 40, flexDirection: 'row', width: '100%', height: 100, alignSelf: 'center', alignItems: 'center' }}>
            <Image style={{ top: -30, resizeMode: 'center', width: 30, height: 26, left: 10, margin: 5 }} source={require('../images/icon/security_2_layer.jpg')}></Image>
            <View style={{ left: 10, top: -13 }}>
                <Text style={{ top: 10, fontSize: 18, fontWeight: '450' }}> Bảo mật 2 lớp</Text>
                <Text style={{ top: 10, color: 'gray', fontSize: 17, height: 100, width: 270 }}>Thêm hình thức xác nhận để bảo vệ tài khoản khi đăng nhập trren thiết bị mới</Text>
            </View>
            <Image style={{ top: -30, resizeMode: 'center', width: 40, height: 45, left: 15 }} source={require('../images/icon/turnoff.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 30, width: "100%", height: 1, backgroundColor: "#d4d4d4", marginLeft: 55, marginBottom: 10 }}></View>

        <TouchableOpacity style={{ top: 40, flexDirection: 'row', width: '100%', height: 100, alignSelf: 'center', alignItems: 'center' }}>
            <Image style={{ top: -30, resizeMode: 'center', width: 30, height: 26, left: 10, margin: 5 }} source={require('../images/icon/login device .jpg')}></Image>
            <View style={{ left: 10, top: -13 }}>
                <Text style={{ top: 10, fontSize: 18, fontWeight: '450' }}> Thiết bị đăng nhập</Text>
                <Text style={{ top: 10, color: 'gray', fontSize: 17, height: 100, width: 270 }}>Quản lý thiết bị bạn sử dụng để đăng nhập Zalo</Text>
            </View>
            <Image style={{ width: 10, height: 15, left: 60 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 30, width: "100%", height: 1, backgroundColor: "#d4d4d4", marginLeft: 55, marginBottom: 10 }}></View>

        <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword')} style={{ top: 0, flexDirection: 'row', width: '100%', height: 60, alignSelf: 'center', alignItems: 'center' }}>
            <Image style={{ top: 20, resizeMode: 'center', width: 30, height: 26, left: 10, margin: 5 }} source={require('../images/icon/password.jpg')}></Image>

            <Text style={{ left: 15, top: 20, fontSize: 18, fontWeight: '450' }}>Mật khẩu</Text>

            <Image style={{ width: 10, height: 15, left: 256, top: 20 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>


        <View style={{ top: 20, width: "100%", height: 7, backgroundColor: "#d4d4d4", marginBottom: 10 }}></View>
        <TouchableOpacity style={{ top: 0, flexDirection: 'row', width: '100%', height: 60, alignSelf: 'center', alignItems: 'center' }} onPress={handleLogout} >

            <Text style={{ left: 15, top: 20, fontSize: 18, fontWeight: '450' }}>Đăng Xuất</Text>

            <Image style={{ width: 10, height: 15, left: 256, top: 20 }} source={require('../images/icon/icon_comes.jpg')}></Image>
        </TouchableOpacity>

        <View style={{ top: 20, width: "100%", height: 50, backgroundColor: "#d4d4d4", marginBottom: 10 }}></View>







        {/* <TouchableOpacity style={{ justifyContent: 'center', width: '100%', height: 60, backgroundColor: '#0085fe' }}>
            <Image style={{ width: 22, height: 18, left: 10 }} source={require('../images/icon/back.jpg')}></Image>
            <Text style={{ position: 'absolute', left: 50, color: 'white', fontWeight: '500', fontSize: 19 }}>Cập nhập mật khẩu</Text>
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', marginBottom: 20, alignItems: 'center', backgroundColor: '#f9fbfe', height: 60, width: '100%' }}>
            <Text style={{ textAlign: 'center', width: '85%', fontSize: 15, }}>Mật mẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của Bạn</Text>
        </View>

        <TouchableOpacity><Text style={{ top: 15, left: 330, fontSize: 17, fontWeight: '500', color: "gray" }}>HIỆN</Text></TouchableOpacity>
        <Text style={{ fontWeight: '600', fontSize: 16, left: 10, bottom: 5 }}>Mật khẩu hiện tại:</Text>

        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2, marginBottom: 30 }} placeholder='Nhập mật khẩu hiện tại' placeholderTextColor={'gray'} ></TextInput>

        <Text style={{ fontWeight: '600', fontSize: 16, left: 10, bottom: 5 }}>Mật khẩu mới:</Text>

        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2, marginBottom: 20 }} placeholder='Nhập mật khẩu mới' placeholderTextColor={'gray'} ></TextInput>


        <TextInput style={{ fontSize: 18, alignSelf: 'center', width: '95%', height: 35, borderBottomColor: '#d6d7d9', borderBottomWidth: 2 }} placeholder='Nhập lại mật khẩu mới' placeholderTextColor={'gray'} ></TextInput>

        <TouchableOpacity style={{ justifyContent: 'center', top: 30, alignSelf: 'center', width: 200, height: 40, backgroundColor: '#0099f9', alignItems: 'center', borderRadius: 20 }}><Text style={{ fontSize: 20, color: 'white', fontWeight: '400' }}>CẬP NHẬP</Text></TouchableOpacity> */}
    </ScrollView>
    </View >
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
    },
})






