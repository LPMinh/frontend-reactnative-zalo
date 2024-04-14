import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList } from 'react-native';
import Header from './Header';

import { useState } from 'react';

export default function FriendRequest({ navigation,route}) {
    const user = route.params?.user;


    const data = [
        { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
        { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
        { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: null },
        { name: "A Lộc", avatar: require("../images/icon/aloc.jpg"), icon_phone: require("../images/icon/phone_blue.jpg") },
    ];
    const [pressedButton, setPressedButton] = useState('received');

    const handlePress = (buttonName) => {
        setPressedButton(buttonName);
    };

    const isPressed = (buttonName) => {
        return pressedButton === buttonName;
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


                    <TouchableOpacity
                        style={[{ padding: 10, width: "50%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('received') ? { borderBottomColor: "#0968e8" } : null]}
                        onPress={() => handlePress('received')}>
                        <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('received') ? { color: 'black' } : null]}>ĐÃ NHẬN</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[{ padding: 10, width: "50%", borderBottomWidth: 2, borderBottomColor: '#d4d4d4' }, isPressed('sent') ? { borderBottomColor: "#0968e8" } : null]}
                        onPress={() => handlePress('sent')}>
                        <Text style={[{ color: '#a8aeb1', textAlign: 'center', fontSize: 17 }, isPressed('sent') ? { color: 'black' } : null]}>ĐÃ GỮI</Text>
                    </TouchableOpacity>


                </View>

                {/* TAP BAN BE */}
                {isPressed('received') ? <View>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                                <Image source={item.avatar} style={{ width: 70, height: 70 }}></Image>
                                <View>
                                    <Text style={{ marginTop: 5, left: 15, fontSize: 17 }}>{item.name}</Text>
                                    <Text style={{ marginTop: 5, left: 15, fontSize: 17, color: 'gray' }}>13/11-Từ danh thiếp</Text>
                                    <View style={{ paddingLeft: 10, marginTop: 5, left: 15, borderRadius: 10, justifyContent: 'center', borderColor: 'gray', borderWidth: 1, height: 40, width: 300 }}><Text>Xin chào ,Tôi là Việt hoàng </Text></View>

                                    <View style={{ marginTop: 7, flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ left: 15, width: 140, height: 35, borderRadius: 30, backgroundColor: '#0c6ee9', AL: 'center', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>ĐỒNG Ý</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ left: 35, width: 140, height: 35, borderRadius: 30, backgroundColor: '#e6e6e6', AL: 'center', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center', color: 'black', fontWeight: '700' }}>TỪ CHỐI</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>




                            </TouchableOpacity>
                        )}
                    ></FlatList>


                </View> : null}
                {isPressed('sent') ? <View>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ flexDirection: 'row', alignContent: "center", margin: 10, width: "100%" }}>
                                <Image source={item.avatar} style={{ width: 70, height: 70 }}></Image>
                                <View style={{ width: '42%' }}>
                                    <Text style={{ marginTop: 10, left: 15, fontSize: 17 }}>{item.name}</Text>
                                    <Text style={{ left: 15, fontSize: 17, color: 'gray' }}>Muốn kết bạn</Text>


                                </View>
                                <TouchableOpacity style={{ alignSelf: 'center', left: 35, width: 100, height: 35, borderRadius: 30, backgroundColor: '#e6e6e6', AL: 'center', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: 'black', fontWeight: '500' }}>THU HỒI</Text>
                                </TouchableOpacity>




                            </TouchableOpacity>
                        )}
                    ></FlatList>


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



});