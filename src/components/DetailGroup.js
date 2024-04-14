import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faArrowRightRotate, faBell, faLeaf, faMagnifyingGlass, faSignOutAlt, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { createGroup, getGroupById, leaveGroup, removeGroup } from "../api/service/group";
import findUserByEmail from "../api/service/user";
export default  function  DetailGroup  ({navigation,route}) {
    const roomInfo= route.params.roomInfo;
    const [group,setGroup]=useState(null);
    const [owner,setIsOwner]=useState(false);
    const [room,setRoom]=useState(null);
    const [members,setMembers]=useState(useSelector(state=>state.groupChat.ListMember))
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const group = await getGroupById(roomInfo.roomId);
                setGroup(group);
    
                const user = await getUser();
                if (group && user && group.owner === user.email) {
                    setIsOwner(true);
                }
            } catch (error) {
                
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [roomInfo.roomId]);

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
    
    const isOwner=async()=>{
        const user =await getUser();
        if(group?.owner===user.email){

            return true;
        }
        return false;
    }
    const isAdministrator=async()=>{
        const user =await getUser();
        if(group?.admins.includes(user.email)){
            return true;
        }
        return false;
    }
    const handleNavigate= async()=>{
        console.warn(isOwner())
        if(await isOwner()){
            return navigation.navigate("membermanagement",{'group':group});
        }else if (await isAdministrator()){
            return navigation.navigate("admin",{'group':group});
        }
        return navigation.navigate("listmember",{'roomInfo':roomInfo})}
    
    const handleLeavegroup=async()=>{
        const groupId=roomInfo.roomId;
        console.warn('groupId',groupId);
        const user = await getUser();
        const memberId=user.email;
        try{
            const response=await leaveGroup(memberId,groupId);
            Alert('Rời nhóm thành công');
            return navigation.goBack();

        }catch(error){
          console.error(error.response.data);
        }
    }
    const handleRemoveGroup=async()=>{
        const groupId=roomInfo.roomId;
        try{
            const user=await getUser();

            await removeGroup(groupId,user.email);
            
            return navigation.navigate('chat');

        }catch(error){
         
          console.error(error.response.data);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.navigate('tab')}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Tùy Chọn</Text>
            </View>
            <View style={{width:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:10 }}>
                <TouchableOpacity style={{borderRadius:50,backgroundColor:'white'}} >
                    <Image source={{uri:roomInfo?.avatar}} style={{width:80,height:80,borderRadius:50}}/>
                </TouchableOpacity>
                <Text style={{fontSize:16,fontWeight:'bold'}}>{roomInfo?.name}</Text>
            </View>
            <View style={{width:'80%',backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',padding:10,alignSelf:'center',borderRadius:10}}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'gray',padding:10,borderRadius:50}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'white',fontSize:20}}/>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:13}}>Tìm kiếm</Text>
                </View>

                <View style={{flexDirection:'column',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'gray',padding:10,borderRadius:50}}  onPress={()=>navigation.navigate("addMember",{'members':members,'groupId':room.id})}>
                    <FontAwesomeIcon icon={faUserEdit} style={{color:'white',fontSize:20}}/>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:13}}>Thêm Thành Viên</Text>
                </View>

                <View style={{flexDirection:'column',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'gray',padding:10,borderRadius:50}}>
                    <FontAwesomeIcon icon={faBell} style={{color:'white',fontSize:20}}/>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:13}}>Tắt Thông báo</Text>
                </View>
            </View>

            <View style={{width:'100%',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',padding:10,alignSelf:'center',marginTop:10}}>
            <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10,marginBottom:10}} onPress={handleNavigate}>
                    <FontAwesomeIcon icon={faUserGroup} style={{color:'gray',fontSize:20}}/>
                    <Text style={{color:'gray',fontSize:16,marginLeft:10}}>Xem thành viên</Text>
                    <FontAwesomeIcon icon={faArrowRight} style={{color:'gray',fontSize:20,position:'absolute',right:10}}/>
            </TouchableOpacity>
            { owner === false  ?
         <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10,marginBottom:10}} onPress={handleLeavegroup} >
         <FontAwesomeIcon icon={faSignOutAlt} style={{color:'gray',fontSize:20}}/>
         <Text style={{color:'red',fontSize:16,marginLeft:10}}>Rời nhóm</Text>
         <FontAwesomeIcon icon={faArrowRight} style={{color:'gray',fontSize:20,position:'absolute',right:10}}/>
 </TouchableOpacity>: <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10,marginBottom:10}} onPress={handleRemoveGroup} >
          <FontAwesomeIcon icon={faSignOutAlt} style={{color:'gray',fontSize:20}}/>
          <Text style={{color:'red',fontSize:16,marginLeft:10}}>Giải tán</Text>
          <FontAwesomeIcon icon={faArrowRight} style={{color:'gray',fontSize:20,position:'absolute',right:10}}/>
  </TouchableOpacity>}    
        
            </View>       
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