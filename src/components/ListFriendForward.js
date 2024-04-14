
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { addMemberToGroup, createGroup } from "../api/service/group";
import { fr } from "react-native-paper-dates";
import { addMember } from "../reduxtoolkit/slice/GroupChatReducer";
import { getRooms } from "../api/service/room";
import { setListRoom } from "../reduxtoolkit/slice/ChatReducer";
export default function Forward({navigation,route}) {
    const friendFromRedux = useSelector((state) => state.notifyAddFriend.friendList);
    const [memberSelected,setMemberSelected]=useState([]);
    const dispatch = useDispatch();
   
    
    
    const handleSelectMember=(email)=>{
        if(isSelected(email)){
            setMemberSelected(memberSelected.filter(item=>item!==email));
        }else{
            setMemberSelected([...memberSelected,email]);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Chuyển Tin Nhắn</Text>
            </View>
           
            <View style={{width:'100%',backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>Danh Sách Bạn Bè</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10}}>
               <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'black',fontSize:20}}/>
                <TextInput style={{width:'70%',height:50,backgroundColor:'white',borderRadius:5}} placeholder='nội dung'/>
            </View>   
            <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}> 
                <FlatList
                
                data={friendFromRedux}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10 }}>
                        <TouchableOpacity style={{width:30,height:30,borderRadius:50,borderWidth:1,backgroundColor:isSelected(item.email)?'gray':'white' }}  onPress={()=>{handleSelectMember(item.email)}}></TouchableOpacity>
                        <Image source={{uri:item.avatar}} style={{width:50,height:50,borderRadius:50,marginLeft:20}}/>
                        <Text style={{marginLeft:10}}>{item.name}</Text>
                    </View>

                )}
                />
            </View>
            <TouchableOpacity style={{width:'100%',height:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} >
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Thêm</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    icon: {
        marginRight: 10,
        fontSize: 20,
        color: '#555',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});