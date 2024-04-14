import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  FlatList,
} from "react-native";
import Header from "./Header";

import { useEffect, useState } from "react";
import { connectAddFiendQueue } from "../api/service/connect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotifyAddFriend,
  removeNotifyAddFriend,
  setFriends,
  setNotifyAddFriend,
} from "../reduxtoolkit/slice/NotifyReducer";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import {
  acceptRequest,
  getAllRequestAddFriendByReciverId,
  getFriendByUserId,
  rejectRequest,
} from "../api/service/nofityaddfriend";
import { ca } from "react-native-paper-dates";
import getUser from "../api/service/loaduser";

export default function FriendRequest({ navigation, route}) {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notifyAddFriend.notifyAddFriend);
 
  const fethListFriend = async () => {
    try {
         const user = await AsyncStorage.getItem('user');
         const userParse = JSON.parse(user);
         const listfriend = await getFriendByUserId(userParse.email);
         console.log('listfriend', listfriend);
         dispatch(setFriends(listfriend));
    } catch (error) {
         console.log('Error fetching data: ', error);
    }
  }
 

  const handleAccept = async (notify) => {
    const user = await getUser();
    try {
      await acceptRequest(user.email, notify.user.email);
      await fethListFriend();
      dispatch(removeNotifyAddFriend(notify.user.email));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleReject = async (notify) => {
    const user = await getUser();
    try {
      await rejectRequest(notify.user.email,user.email);
      dispatch(removeNotifyAddFriend(notify.user.email));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const [pressedButton, setPressedButton] = useState("received");

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const isPressed = (buttonName) => {
    return pressedButton === buttonName;
  };

  const right = () => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
      <TouchableOpacity>
        <Image
          source={require("../images/icon/add-user.jpg")}
          style={{ width: 30, height: 30 }}></Image>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header Right={right} />
      <ScrollView style={{ width: "100%", height: "100%" }}>
        {/* 3 TAP BAN BE --NHOM--OA */}
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <TouchableOpacity
            style={[
              {
                padding: 10,
                width: "50%",
                borderBottomWidth: 2,
                borderBottomColor: "#d4d4d4",
              },
              isPressed("received") ? { borderBottomColor: "#0968e8" } : null,
            ]}
            onPress={() => handlePress("received")}>
            <Text
              style={[
                { color: "#a8aeb1", textAlign: "center", fontSize: 17 },
                isPressed("received") ? { color: "black" } : null,
              ]}>
              ĐÃ NHẬN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                padding: 10,
                width: "50%",
                borderBottomWidth: 2,
                borderBottomColor: "#d4d4d4",
              },
              isPressed("sent") ? { borderBottomColor: "#0968e8" } : null,
            ]}
            onPress={() => handlePress("sent")}>
            <Text
              style={[
                { color: "#a8aeb1", textAlign: "center", fontSize: 17 },
                isPressed("sent") ? { color: "black" } : null,
              ]}>
              ĐÃ GỮI
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAP BAN BE */}
        {isPressed("received") ? (
          <View>
            <FlatList
              data={notify}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    margin: 10,
                    width: "100%",
                  }}>
                  <Image
                    source={item.user.avatar}
                    style={{ width: 70, height: 70 }}></Image>
                  <View>
                    <Text style={{ marginTop: 5, left: 15, fontSize: 17 }}>
                      {item.user.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        left: 15,
                        fontSize: 17,
                        color: "gray",
                      }}>
                      13/11-Từ danh thiếp
                    </Text>
                    <View
                      style={{
                        paddingLeft: 10,
                        marginTop: 5,
                        left: 15,
                        borderRadius: 10,
                        justifyContent: "center",
                        borderColor: "gray",
                        borderWidth: 1,
                        height: 40,
                        width: 300,
                      }}>
                      <Text>{item.message}</Text>
                    </View>

                    <View style={{ marginTop: 7, flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          left: 15,
                          width: 140,
                          height: 35,
                          borderRadius: 30,
                          backgroundColor: "#0c6ee9",
                          AL: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => handleAccept(item)}
                        >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "700",
                          }}>
                          ĐỒNG Ý
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          left: 35,
                          width: 140,
                          height: 35,
                          borderRadius: 30,
                          backgroundColor: "#e6e6e6",
                          AL: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => handleReject(item)}
                        >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "700",
                          }}>
                          TỪ CHỐI
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}></FlatList>
          </View>
        ) : null}
        {isPressed("sent") ? (
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    margin: 10,
                    width: "100%",
                  }}>
                  <Image
                    source={item.avatar}
                    style={{ width: 70, height: 70 }}></Image>
                  <View style={{ width: "42%" }}>
                    <Text style={{ marginTop: 10, left: 15, fontSize: 17 }}>
                      {item.name}
                    </Text>
                    <Text style={{ left: 15, fontSize: 17, color: "gray" }}>
                      Muốn kết bạn
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      left: 35,
                      width: 100,
                      height: 35,
                      borderRadius: 30,
                      backgroundColor: "#e6e6e6",
                      AL: "center",
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "500",
                      }}>
                      THU HỒI
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}></FlatList>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
});
