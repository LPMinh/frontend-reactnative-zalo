import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList } from 'react-native';
import Header from './Header';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getUser from '../api/service/loaduser';
import ItemMessage from './ItemMessage';
import { extractName, getColorForName } from '../api/service/ExtractUserName';

export default function ContactScreen({navigation}) {

  const data = useSelector((state) => state.notifyAddFriend.friendList);
  const  rooms = useSelector((state) => state.appChat.listRoom);
  const [listRoom,setListRoom]=useState(rooms);
  const [user, setUser] = useState({});
  const getRoomGroup = async (rooms) => {
    return rooms.filter((room) => room.roomType === 'GROUP_CHAT');
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setListRoom( await getRoomGroup(rooms));
    };
    

    fetchUser();
  }, []);
  
  const dataGroup = [
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online",
      birthday: "Hôm nay là sinh nhật của Điệp Hồ",
      icon_off_notification: require("../images/icon/aloc.jpg"),
      time_most_recent_message: "1 phút",

    },

  ];



  const [pressedButton, setPressedButton] = useState('friend');

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const isPressed = (buttonName) => {
    return pressedButton === buttonName;
  };

  const [pressedButton2, setPressedButton2] = useState('tatca');

  const handlePress2 = (buttonName) => {
    setPressedButton2(buttonName);
  };

  const isPressed2 = (buttonName) => {
    return pressedButton2 === buttonName;
  };
  const right = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      <TouchableOpacity>
        <Image source={require('../images/icon/add-user.jpg')} style={{ width: 30, height: 30 }}></Image>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <Header Right={right} />
      <ScrollView style={{ width: "100%", height: "100%" }}>

        {/* 3 TAP BAN BE --NHOM--OA */}
        <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: "space-between", width: "100%" }}>

          {/* TAP BAN BE */}
          <TouchableOpacity
            style={[{ padding: 10, width: "33.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('friend') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('friend')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('friend') ? { color: 'black' } : null]}>Bạn bè</Text>
          </TouchableOpacity>


          {/* TAP NHOM */}
          <TouchableOpacity
            style={[{ padding: 10, width: "33.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('nhom') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('nhom')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('nhom') ? { color: 'black' } : null]}>Nhóm</Text>
          </TouchableOpacity>

          {/* TAP OA */}
          <TouchableOpacity
            style={[{ padding: 10, width: "33.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('OA') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('OA')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('OA') ? { color: 'black' } : null]}>OA</Text>
          </TouchableOpacity>
        </View>

        {/* TAP BAN BE */}
        {isPressed('friend') ? <View>
          <View style={{ marginTop: 10, width: "44%", padding: 0 }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "center", margin: 10 }}>
              <Image source={require('../images/icon/friend_request.jpg')} style={{ width: 40, height: 40 }}></Image>
              <Text style={{ position: 'absolute', left: 45, top: 5, fontSize: 17 }}>Lời mời kết bạn</Text>
              {/* <Text>
                <Text style={{ position: 'absolute', left: 45, top: 5, fontSize: 17 }}>Lời mời kết bạn</Text>
              </Text> */}


            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "center", margin: 10 }}>
              <Image source={require('../images/icon/machine_directory.jpg')} style={{ width: 40, height: 40 }}></Image>
              <Text style={{ position: 'absolute', left: 45, top: 0, fontSize: 17 }} >Danh bạ máy</Text>
              <Text style={{ position: 'absolute', left: 45, top: 18, color: "gray", width: 300 }} >Các liên hệ có dùng Zalo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "center", margin: 10 }}>
              <Image source={require('../images/icon/birthday_calendar.jpg')} style={{ width: 40, height: 40 }}></Image>
              <Text style={{ position: 'absolute', left: 45, top: 0, fontSize: 17 }} >Lịch sinh nhật</Text>
              <Text style={{ position: 'absolute', left: 45, top: 18, color: "gray", width: 300 }} >Theo dõi sinh nhật của bạn bè</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 20 }}></View>

          <View style={{ marginTop: 15, paddingLeft: 10, alignItems: "center", flexDirection: 'row', width: "100%" }}>
            <TouchableOpacity
              style={[{ padding: 10, marginLeft: 10, borderWidth: 1, borderColor: "#dcdfe1", borderRadius: 20 }, isPressed2('tatca') ? { backgroundColor: '#dcdfe1' } : null]}
              onPress={() => handlePress2('tatca')}>
              <Text style={[{ color: '#a8aeb1', textAlign: 'center', width: 75 }, isPressed2('tatca') ? { color: 'black' } : null]}>Tất cả 76</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ padding: 10, marginLeft: 10, borderWidth: 1, borderColor: "#dcdfe1", borderRadius: 20 }, isPressed2('moitrycap') ? { backgroundColor: '#dcdfe1' } : null]}
              onPress={() => handlePress2('moitrycap')}>
              <Text style={[{ color: '#a8aeb1', textAlign: 'center', width: 110 }, isPressed2('moitrycap') ? { color: 'black' } : null]}>Mới truy cập 9</Text>
            </TouchableOpacity>


          </View>
          {/* TAP TAT CA */}
          {isPressed2('tatca') ? <View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ flexDirection: "row", width: "100%", alignSelf: "center" }} onPress={()=>navigation.navigate('chatbox',{receiverId:item.email,senderId:user.email,avatar:item?.avatar,name:item?.name})}>
                   {item.avatar ? <Image style={{height:50,width:50,borderRadius:50,margin:10}} source={{uri:item?.avatar}}/>:
                                <View style={{height:50,width:50,borderRadius:50,margin:10,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                                    <Text  >{extractName(item.name)}</Text>
                                </View>}
                  
                  <Text style={{ top: 30, left: 15, fontSize: 16 }}>{item.name}</Text>
                  {/* button phone */}
                  <TouchableOpacity style={{ position: "absolute", top: 20, right: 70, margin: 10 }}>
                    <Image source={require("../images/icon/phone.jpg")} style={{ resizeMode: "cover", width: 25, height: 25 }}></Image>
                  </TouchableOpacity>
                  {/* button video call */}
                  <TouchableOpacity style={{ position: "absolute", top: 21, right: 20, margin: 10 }}>
                    <Image source={require("../images/icon/videocall.jpg")} style={{ resizeMode: "cover", width: 23, height: 20 }}></Image>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            >

            </FlatList>

          </View> : null}
          {/* TAP MOI TRY CAP */}
          {isPressed2('moitrycap') ? <View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ flexDirection: "row", width: "100%", alignSelf: "center" }}>
                  <Image source={item.image} style={{ width: 60, height: 60, margin: 10 }}></Image>
                  <Text style={{ top: 30, left: 15, fontSize: 16 }}>{item.name}</Text>
                  {/* button phone */}
                  <TouchableOpacity style={{ position: "absolute", top: 20, right: 70, margin: 10 }}>
                    <Image source={require("../images/icon/phone.jpg")} style={{ resizeMode: "cover", width: 25, height: 25 }}></Image>
                  </TouchableOpacity>
                  {/* button video call */}
                  <TouchableOpacity style={{ position: "absolute", top: 21, right: 20, margin: 10 }}>
                    <Image source={require("../images/icon/videocall.jpg")} style={{ resizeMode: "cover", width: 23, height: 20 }}></Image>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            >

            </FlatList>

          </View> : null}


        </View> : null}
        {/* TAP  NHOM */}
        {isPressed('nhom') ? <View>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Image source={require("../images/icon/add_new_group.jpg")} style={{ resizeMode: "center", width: 60, height: 60, margin: 10 }}></Image>
            <Text style={{ top: 30, fontSize: 18 }}>Tạo nhóm mới</Text>
          </View>

          <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginBottom: 10 }}></View>

          <Text style={{ left: 10, fontSize: 16, fontWeight: 500 }}>Tính năng nỗi bật</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5 }}>

            <TouchableOpacity style={{ alignItems: "center" }}>
              <Image source={require("../images/icon/calendar_group.jpg")} style={{ width: 60, height: 60, margin: 10 }}></Image>
              <Text>Lịch</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Image source={require("../images/icon/appointment_reminder.jpg")} style={{ width: 60, height: 60, margin: 10 }}></Image>
              <Text>Nhắc hẹn</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Image source={require("../images/icon/group_offline.jpg")} style={{ width: 60, height: 60, margin: 10 }}></Image>
              <Text>Nhóm Offline</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }}>
              <Image source={require("../images/icon/share_picture.jpg")} style={{ width: 60, height: 60, margin: 10 }}></Image>
              <Text>Chia sẻ ảnh</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 10 }}></View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginTop: 10, left: 10, fontSize: 16, fontWeight: 500, marginRight: 105 }}>Nhóm đang tham gia</Text>
            <Image source={require("../images/icon/arrange.jpg")} style={{ width: 14, height: 14, top: 5 }}></Image>
            <Text style={{ marginTop: 10, left: 5, fontSize: 16, color: "#99a0a5" }}>Sắp xếp</Text>
          </View>

          <FlatList
          data={listRoom}
          keyExtractor={(item) => item.roomId.toString()}
          renderItem={({ item }) => (
            <ItemMessage item={item} navigation={navigation} />

          )}
          style={{ width: '100%', width: '100%' }}
        />


        </View> : null}

        {/* TAP OA */}
        {isPressed('OA') ? <View>
          <View style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", width: 300 }}>
            <Image source={require("../images/icon/official_Account.jpg")} style={{ width: 60, height: 60, margin: 5 }}></Image>
            <Text style={{ fontSize: 18, left: 10 }}>Tìm thêm Official Account</Text>
          </View>

          <View style={{ width: "100%", height: 10, backgroundColor: "#f3f4f6", marginTop: 20 }}></View>
          <Text style={{ fontSize: 15, margin: 10 }}>Official Account đã quan tâm</Text>

          <View style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", width: 300 }}>
            <Image source={require("../images/icon/zalo_pay_oa.jpg")} style={{ width: 50, height: 50, margin: 5 }}></Image>
            <Text style={{ fontSize: 18, left: 10 }}>ZaloPay</Text>
          </View>
          <View style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", width: 300 }}>
            <Image source={require("../images/icon/zing_oa.jpg")} style={{ width: 50, height: 50, margin: 5 }}></Image>
            <Text style={{ fontSize: 18, left: 10 }}>Zing</Text>
          </View>
          <View style={{ top: 10, left: 10, flexDirection: "row", alignItems: "center", width: 300 }}>
            <Image source={require("../images/icon/zingmp3_oa.jpg")} style={{ width: 50, height: 50, margin: 5 }}></Image>
            <Text style={{ fontSize: 18, left: 10 }}>Zing MP3</Text>
          </View>



        </View> : null}

      </ScrollView >

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  // button: {
  //   padding: 10,
  //   width: "33.5%",
  //   borderBottomWidth: 2,
  //   borderBottomColor: '#d4d4d4',
  // },

  // buttonPressed: {

  //   borderBottomColor: "#0968e8",

  // },
  // text: {
  //   color: '#a8aeb1',
  //   textAlign: 'center',
  // },
  // textPressed: {
  //   color: 'black',
  // },
  /////  button tat ca va moi truy cap
  // button2: {
  //   padding: 10,
  //   marginLeft: 10,
  //   borderWidth: 1,
  //   borderColor: "#dcdfe1",
  //   borderRadius: 20,
  // },

  // buttonPressed2: {
  //   backgroundColor: '#dcdfe1',  // Màu sắc khi nút được nhấn
  //   // borderBottomColor: "#0968e8",

  // },


});