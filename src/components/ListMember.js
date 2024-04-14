import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faArrowRightRotate, faBell, faKey, faLeaf, faMagnifyingGlass, faSignOutAlt, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { createGroup, getGroupById } from "../api/service/group";
import { getRoom } from "../api/service/room";
import findUserByEmail from "../api/service/user";
export default function ListMember({navigation,route}) {
    const roomInfo= route.params.roomInfo;
    const [room,setRoom]=useState(null);
    const [members,setMembers]=useState(useSelector(state=>state.groupChat.ListMember))
    const dispatch = useDispatch();
    useEffect( ()=>{
        const fetchMembers=async()=>{
        const room=await getGroupById(roomInfo.roomId);
           if(room.members){
               const members=[];
                for(let i=0;i<room.members.length;i++){
                     const member=await findUserByEmail(room.members[i]);
                     members.push(member);
                }
                setRoom(room);
                dispatch(setMembers(members));
                
           }
           
        }
        fetchMembers();
    },[])
    const checkOwner=(email)=>{
        if(room?.owner===email){
            return true;
        }
        return false;
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Thành Viên</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("addMember",{'members':members,'groupId':room.id})} style={{position:'absolute',right:10}}>
                    <Image
                    source={require('../images/icon/add.jpg')}
                    style={{ width: 30, height: 30 }}
                    />
                 </TouchableOpacity>
            </View>
            <Text style={{fontSize:16,fontWeight:'bold',padding:10,color:'#0895FB'}}>thành viên</Text>
            <FlatList
                data={members}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}>
                        <Image source={{uri:item.avatar}} style={{width:50,height:50,borderRadius:50}}/>
                        {checkOwner(item.email)?<FontAwesomeIcon icon={faKey} style={{color:'gold',fontSize:20,marginLeft:5}}/>:<></>}
                        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10}}>{item.name}</Text>
                    </View>
                )}
            />
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