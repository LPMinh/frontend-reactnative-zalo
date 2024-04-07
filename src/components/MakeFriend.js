import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList, TextInput } from 'react-native';
import Header from './Header';

import { useState } from 'react';

export default function MakeFriend() {
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
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", margin: 10, width: "100%" }}>
                    <Image source={require('../images/icon/aloc.jpg')} style={{ width: 70, height: 70 }}></Image>
                    <View>
                        <Text style={{ left: 15, fontSize: 17 }}>Phạm thị xuân Hiền </Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../images/icon/edit_name_friend.jpg')} style={{ width: 35, height: 35, left: 50 }}></Image>
                    </TouchableOpacity>

                </TouchableOpacity>

                <View style={{ marginTop: 15, width: '90%', height: 1, backgroundColor: '#f3f4f6', left: '5%' }}></View>
                <TextInput multiline={true} style={{ padding: 10, textAlignVertical: 'top', borderColor: 'gray', borderWidth: 1, width: '90%', height: 100, top: 20, alignSelf: 'center' }}>
                    Xin chào, mình là Trandinhchuong. Thấy bạn trong nhóm Nhập môn dữ liệu lớn (LT) 420300232905 - DHKTPM16A nên mình muốn kết bạn!
                </TextInput>

                <View style={{ marginTop: 40, width: '100%', height: 10, backgroundColor: '#f3f4f6' }}></View>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", margin: 10, width: "100%" }}>

                    <View>
                        <Text style={{ left: 15, fontSize: 17 }}>Chặn xem nhật ký của tôi </Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../images/icon/turnoff.jpg')} style={{ resizeMode: 'center', width: 40, height: 30, left: 130 }}></Image>
                    </TouchableOpacity>

                </TouchableOpacity>
                <View style={{ backgroundColor: '#f3f4f6', width: '100%', height: 600 }}>

                    <TouchableOpacity style={{ top: 20, width: '80%', height: 35, borderRadius: 30, backgroundColor: '#0c6ee9', alignSelf: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>GỮI YÊU CẦU</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        width: '100%',
        height: '100%',
    },



});