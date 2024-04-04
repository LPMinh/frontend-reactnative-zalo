import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function MyProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  AsyncStorage.getItem('user').then((user) => {
    setUser(JSON.parse(user));
  });
  const right = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      <TouchableOpacity>
        <Image source={require('../images/icon/setting.jpg')} style={{ width: 30, height: 30 }}></Image>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <Header Right={right} />
      <ScrollView style={{width:'100%'}}>
      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", width: 300 }}>
        {/* <Image source={require("../images/icon/icon_my_profile.jpg")} style={{ width: 60, height: 60, marginRight: 15 }}></Image> */}
        {user?.avatar ? <Image source={{ uri: user?.avatar }} style={{ width: 60, height: 60, marginRight: 15 ,borderRadius:50}}></Image> : <Image source={require("../images/icon/icon_my_profile.jpg")} style={{ width: 60, height: 60, marginRight: 15 }}></Image>}
        <View>
          <Text style={{ fontSize: 17, marginRight: 100 }}>{user?.name}</Text>
          <Text style={{ color: "gray" }}>Xem trang cá nhân</Text>
        </View>
        <TouchableOpacity style={{ margin: 30 }}>
          <Image source={require("../images/icon/icon_update_my_profile.jpg")} style={{ width: 25, height: 25 }}></Image>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 15 }}></View>

      {/* Nhac cho zalo */}

      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50 }}>
        <Image source={require("../images/icon/ring_phone_zalo.jpg")} style={{ width: 30, height: 30, marginRight: 15 }}></Image>
        <View>
          <View style={{ left: 10, flexDirection: "row", alignItems: "center", height: 30 }}>
            <Text style={{ fontSize: 17 }}>Nhạc chờ Zalo</Text>
            <Image source={require("../images/icon/crown_music_zalo.jpg")} style={{ width: 15, height: 15, margin: 10 }}></Image>
          </View>
          <Text style={{ left: 10, color: "gray", fontSize: 16 }}>Đăng ký nhạc chờ , thể hiện cá tính</Text>
        </View>
      </TouchableOpacity>

      <View style={{ width: "100%", height: 2, backgroundColor: "#f3f4f6", marginLeft: 60, marginTop: 30 }}></View>


      {/* Ví QR zalo */}
      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50 }}>
        <Image source={require("../images/icon/QR_wallet.jpg")} style={{ width: 30, height: 30, marginRight: 15 }}></Image>
        <View>
          <Text style={{ left: 10, fontSize: 17 }}>Ví QR</Text>
          <Text style={{ left: 10, color: "gray", fontSize: 16 }}>Lưu trữ và xuất trình mã QR quan trọng</Text>
        </View>
      </TouchableOpacity>


      <View style={{ width: "100%", height: 2, backgroundColor: "#f3f4f6", marginLeft: 60, marginTop: 30 }}></View>


      {/* cloud của tôi */}
      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50, width: "100%" }}>
        <Image source={require("../images/icon/QR_wallet.jpg")} style={{ width: 30, height: 30, marginRight: 15 }}></Image>
        <View>
          <Text style={{ left: 10, fontSize: 17 }}>Clound của tôi</Text>
          <Text style={{ left: 10, color: "gray", fontSize: 16 }}>236,4 /1 GB</Text>
          <Image source={require("../images/icon/Cloud_measure.jpg")} style={{ resizeMode: "center", width: 260, height: 20, left: 5, }}></Image>

        </View>
        <Image source={require("../images/icon/icon_comes.jpg")} style={{ width: 15, height: 15, position: "absolute", right: 25 }}></Image>
      </TouchableOpacity>


      <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 30 }}></View>


      {/* Dung lượng và dữ liệu */}
      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50 }}>
        <Image source={require("../images/icon/capacity and data.jpg")} style={{ width: 30, height: 30, marginRight: 15 }}></Image>
        <View>
          <Text style={{ left: 10, fontSize: 17 }}>Dung lượng và dữ liệu</Text>
          <Text style={{ left: 10, color: "gray", fontSize: 16 }}>Quản lý dữ liệu Zalo của bạn</Text>
        </View>
      </TouchableOpacity>


      <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 25 }}></View>


      {/* Tìa khoản và bảo mật*/}
      <TouchableOpacity onPress={() => navigation.navigate('AccountAndSecurity')} style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50, width: "100%" }}>
        <Image source={require("../images/icon/account_and_security .jpg")} style={{ width: 25, height: 30, marginRight: 15 }}></Image>
        <Text style={{ left: 10, fontSize: 17, marginRight: 140 }}>Tài khoản và bảo mật</Text>
        <Image source={require("../images/icon/icon_comes.jpg")} style={{ width: 15, height: 15, position: "absolute", right: 25 }}></Image>
      </TouchableOpacity>


      <View style={{ width: "100%", height: 2, backgroundColor: "#f3f4f6", marginLeft: 60, marginTop: 20 }}></View>


      {/* Quyền  riêng tư*/}
      <TouchableOpacity style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", height: 50, width: "100%" }}>
        <Image source={require("../images/icon/privacy.jpg")} style={{ width: 25, height: 30, marginRight: 15 }}></Image>
        <Text style={{ left: 10, fontSize: 17, marginRight: 195 }}>Quyền riêng tư</Text>
        <Image source={require("../images/icon/icon_comes.jpg")} style={{ width: 15, height: 15, position: "absolute", right: 25 }}></Image>
      </TouchableOpacity>

      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  }
});