// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Header';

// export default function DiaryScreen() {
//   const right = ()=>(
//     <View style={{flexDirection:'row',alignItems:'center'}}>
//       <TouchableOpacity>
//           <Image source={require('../images/icon/note.jpg')} style={{width:30,height:30}}></Image>
//       </TouchableOpacity>
//       <TouchableOpacity>
//           <Image source={require('../images/icon/notify.jpg')} style={{width:30,height:30}}></Image>
//       </TouchableOpacity>
//     </View>
//   )
//   return (
//     <View style={styles.container}>
//         <Header Right={right}/>


//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     width:'100%',
//     height:'100%',
//   }
// });
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList } from 'react-native';
import Header from './Header';

import { useState, useEffect } from 'react';
import fetchDataUserByID from '../api/service/findUserByID';
export default function DiaryScreen() {

  const data = [
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: null },
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
  ];
  const data_3_contact = [
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
    { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: null },
  ];

  const dataGroup = [
    {
      imageGroup: require("../images/icon/aloc.jpg"),
      icon_community: require("../images/icon/aloc.jpg"),
      title: "ta2 105.23-24",
      most_recent_message: "Nguyễn thúy tình: Sáng mai học online lập trình allll sdlasdassjdaskhjhasdjhashjkas",
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

  const [pressedButton, setPressedButton] = useState('all');

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const isPressed = (buttonName) => {
    return pressedButton === buttonName;
  };

  // const [pressedButton2, setPressedButton2] = useState('tatca');

  // const handlePress2 = (buttonName) => {
  //   setPressedButton2(buttonName);
  // };

  // const isPressed2 = (buttonName) => {
  //   return pressedButton2 === buttonName;
  // };

  const [emailValue, setEmailValue] = useState('');
  const [user, setUser] = useState({});

  // Hàm để nhận giá trị của email từ Header
  const getEmailValue = (email) => {
    // Kiểm tra xem email có đuôi @gmail.com không
    if (email.endsWith('@gmail.com')) {
      setEmailValue(email);
      console.log('emailValue :', emailValue);
      console.log('email :', email)
    }
    else {
      // Nếu không có đuôi @gmail.com, không thực hiện gán setEmailValue
      console.log('Email không hợp lệ');
      setEmailValue('');
      setUser({});
      // Có thể hiển thị một thông báo lỗi hoặc thực hiện hành động khác tùy ý
    }
  };


  // const getData = async () => {
  //   try {
  //     // Gọi fetchDataUserByID với giá trị email từ state emailValue
  //     const fetchedData = await fetchDataUserByID(emailValue);

  //     // Cập nhật state user với dữ liệu lấy được
  //     setUser(fetchedData);

  //     console.log('datafetch =', fetchedData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const getData = async () => {
  //   try {
  //     const fetchedData = await findUserByID(emailValue);
  //     setUser(fetchedData);
  //     console.log('datafetch =', fetchedData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchDataUserByID(emailValue);
        console.log('fetchedData :', fetchedData);
        setUser(fetchedData);
        console.log('user : ', user);
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    getData();
  }, [emailValue]); // Thêm emailValue vào mảng dependency để useEffect được kích hoạt khi emailValue thay đổi



  const right = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      <TouchableOpacity>
        <Image source={require('../images/icon/add-user.jpg')} style={{ width: 30, height: 30 }}></Image>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <Header Right={right} getEmailValue={getEmailValue} />
      <ScrollView style={{ width: "100%", height: "100%" }}>



        {/* 3 TAP BAN BE --NHOM--OA */}
        <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: "space-between", width: "105%" }}>

          {/* TAP BAN BE */}
          <TouchableOpacity
            style={[{ padding: 10, width: "20.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('all') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('all')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('all') ? { color: 'black' } : null]}>Tất cả</Text>
          </TouchableOpacity>

          {/* TAP contact */}
          <TouchableOpacity
            style={[{ padding: 10, width: "28.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('contact') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('contact')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('contact') ? { color: 'black' } : null]}>Liên hệ (37)</Text>
          </TouchableOpacity>

          {/* TAP message */}
          <TouchableOpacity
            style={[{ padding: 10, width: "30.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('message') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('message')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('message') ? { color: 'black' } : null]}>Tin nhắn (87)</Text>
          </TouchableOpacity>
          {/* TAP discover */}
          <TouchableOpacity
            style={[{ padding: 10, width: "33.5%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('discover') ? { borderBottomColor: "#0968e8" } : null]}
            onPress={() => handlePress('discover')}>
            <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('discover') ? { color: 'black' } : null]}>Khám phá(99+)</Text>
          </TouchableOpacity>
        </View>

        {/* TAP all*/}
        {isPressed('all') ? <View style={{ width: "100%" }}>
          <View>
            {Object.keys(user).length !== 0 && ( // Kiểm tra nếu user khác rỗng
              <View>
                {/* Đây là view sẽ được render nếu user khác rỗng */}
                <Text style={{ fontSize: 16, left: 10, marginBottom: 10, top: 10, fontSize: 17, fontWeight: "500" }}>Tìm qua email (1)</Text>
                {/* Thêm các thông tin khác về người dùng nếu cần */}
                <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                  <Image source={require('../images/icon/aloc.jpg')} style={{ width: 70, height: 70 }}></Image>
                  <View>
                    <Text style={{ left: 15, top: 10, fontSize: 17 }}>{user.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ marginTop: 5, left: 15, top: 10, fontSize: 17, width: 200 }}>Email: <Text style={{ color: '#2187ab' }}>{user.email}1111111111111111111111111</Text></Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: "center", alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff9f7', borderRadius: 20, width: 120, height: 35, top: -5 }}><Text style={{ color: "#0095fb", fontWeight: '500' }}>KẾT BẠN</Text></TouchableOpacity>

                  {/* <Image source={item.icon_phone} style={{ width: 50, height: 50, left: 160 }}></Image> */}

                </TouchableOpacity>
              </View>
            )}
            {/* Các phần tử JSX khác */}
          </View>
          <View style={{ marginTop: 10, width: "100%", padding: 0 }}>
            <Text style={{ fontSize: 16, left: 10, marginBottom: 10 }}>Liên hệ (36)</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                  <Image source={item.avatar} style={{ width: 60, height: 60 }}></Image>
                  <Text style={{ marginTop: 5, left: 15, top: 10, fontSize: 17 }}>{item.name}</Text>

                  <Image source={item.icon_phone} style={{ width: 50, height: 50, left: 160 }}></Image>

                </TouchableOpacity>
              )}
            ></FlatList>
          </View>


        </View> : null}
        {/* TAP  NHOM */}
        {isPressed('contact') ? <View style={{ width: "100%" }} >
          <Text style={{ fontSize: 16, left: 10, top: 10, marginBottom: 10 }}>Nổi bật</Text>


          <FlatList
            horizontal
            style={{ width: '100%', height: 130 }}
            data={data_3_contact}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ width: 135 }}>
                <Image source={item.avatar} style={{ alignSelf: 'center', resizeMode: "cover", width: 70, height: 70, margin: 10 }}></Image>
                <Text style={{ textAlign: 'center', top: 0, fontSize: 18 }}>{item.name}</Text>

              </TouchableOpacity>
            )}
          >
          </FlatList>




          <View style={{ width: "100%", height: 14, backgroundColor: "#f3f4f6", marginBottom: 10 }}></View>


          <Text style={{ left: 10, fontSize: 16, fontWeight: 500 }}>Bạn bè (9)</Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                <Image source={item.avatar} style={{ width: 60, height: 60 }}></Image>
                <Text style={{ marginTop: 5, left: 15, top: 10, fontSize: 17 }}>{item.name}</Text>

                <Image source={item.icon_phone} style={{ width: 50, height: 50, left: 160 }}></Image>

              </TouchableOpacity>
            )}
          ></FlatList>



          <Text style={{ left: 10, fontSize: 16, fontWeight: 500 }}>Nhóm(9)</Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                <Image source={item.avatar} style={{ width: 60, height: 60 }}></Image>
                <Text style={{ marginTop: 5, left: 15, top: 10, fontSize: 17 }}>{item.name}</Text>

                <Image source={item.icon_phone} style={{ width: 50, height: 50, left: 160 }}></Image>

              </TouchableOpacity>
            )}
          ></FlatList>

          <Text style={{ left: 10, fontSize: 16, fontWeight: 500 }}>Người đã liên hệ(9)</Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                <Image source={item.avatar} style={{ width: 60, height: 60 }}></Image>
                <Text style={{ marginTop: 5, left: 15, top: 10, fontSize: 17 }}>{item.name}</Text>

                <Image source={item.icon_phone} style={{ width: 50, height: 50, left: 160 }}></Image>

              </TouchableOpacity>
            )}
          ></FlatList>




        </View> : null}
        {isPressed('message') ? <View style={{ width: "100%" }} >
          <Text style={{ fontSize: 16, left: 10, top: 10, marginBottom: 10 }}>Nổi bật</Text>

          <FlatList
            data={dataGroup}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", height: 90, marginBottom: 10, width: '100%' }}>
                  {/*ICON group  */}
                  <Image source={require("../images/icon/icon_group_cnm.jpg")} style={{ width: 60, height: 60, margin: 10 }}></Image>

                  {/*ICON ALL   */}
                  <View style={{ alignItems: "center", width: '80%' }}>

                    {/* ROW TILE 1*/}
                    <View style={{ flexDirection: "row", alignItems: "center", height: 30, width: "100%", }}>
                      <View style={{ width: '83%' }}><Text style={{ fontSize: 20, fontWeight: 600, }}>{item.title}</Text></View>
                      <Text style={{ right: 0 }}>15:39</Text>
                    </View>

                    {/* ROW MESS  RECENT 2*/}
                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#818181', top: -5, left: 0, fontSize: 16, width: '80%' }} >{item.most_recent_message}</Text>
                    </View>



                    <View style={{ width: "100%" }}>
                      <Text style={{ fontSize: 16 }}>28 kết quả phù hợp</Text>
                    </View>




                  </View>

                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: "#f3f4f6", marginLeft: 75 }}></View>



              </TouchableOpacity>
            )}
          >

          </FlatList>




        </View> : null
        }



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