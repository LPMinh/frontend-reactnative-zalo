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
import { extractName, getColorForName } from "../api/service/ExtractUserName";
export default function AddMember({navigation,route}) {
    const friendFromRedux = useSelector((state) => state.notifyAddFriend.friendList);
    const friendingroup = route.params.members;
    const groupid = route.params.groupId;;
    console.warn('friendingroup',friendingroup);
    const [search,setSearch]=useState('');
    const [memberSelected,setMemberSelected]=useState([]);
    const dispatch = useDispatch();
    const fetchRooms = async () => {
        const user = await getUser();
        const rooms = await getRooms(user.email);
        console.log(rooms);
        dispatch(setListRoom(rooms.roomResponses));
      }
    const handleAddMember= async()=>{
        try{
            const user=await getUser();
                await addMemberToGroup(user.email,memberSelected,groupid);
                await fetchRooms();
                return navigation.navigate('tab');
        }catch(error){
            console.error(error);
        }
    }
    const getFriendNotInGroup=()=>{
        const friendNotInGroup=[];
        for(let i=0;i<friendFromRedux.length;i++){
            if(!checkInclude(friendFromRedux[i])){
                friendNotInGroup.push(friendFromRedux[i]);
            }
        }
        return friendNotInGroup;
    }
    const checkInclude=(friend)=>{
        for(let i=0;i<friendingroup.length;i++){
            if(friendingroup[i].email===friend.email){
                return true;
            }
        }
        return false;
    }
    const [friendlist,setfriendlist] = useState(getFriendNotInGroup());

    useEffect(()=>{
       if(search==='') return setfriendlist(getFriendNotInGroup());
       setfriendlist(friendlist.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())));

    },[search]);
   
    const handleSelectMember=(id)=>{
        if(memberSelected.includes(id)){
            setMemberSelected(memberSelected.filter(item=>item!==id));
        }else{
            setMemberSelected([...memberSelected,id]);
        }
    }
    const isSelected=(id)=>{
        return memberSelected.includes(id);
    }
    
   
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Thêm thành viên</Text>
            </View>
           
            <View style={{width:'100%',backgroundColor:'#0895FB',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>Thêm thành viên</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10}}>
               <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'black',fontSize:20}}/>
                <TextInput style={{width:'70%',height:50,backgroundColor:'white',borderRadius:5}} placeholder='Tìm kiếm' onChangeText={setSearch}/>
            </View>   
            <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}> 
                <FlatList
                
                data={friendlist}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10 }}>
                        <TouchableOpacity style={{width:30,height:30,borderRadius:50,borderWidth:1,backgroundColor:isSelected(item.email)?'gray':'white' }}  onPress={()=>{handleSelectMember(item.email)}}></TouchableOpacity>
                        {item.avatar ? <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/>:
                                <View style={{height:50,width:50,borderRadius:50,marginLeft:10,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                                    <Text >{extractName(item.name)}</Text>
                                </View>}
                        <Text style={{marginLeft:10}}>{item.name}</Text>
                    </View>

                )}
                />
            </View>
            <TouchableOpacity style={{width:'100%',height:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} onPress={handleAddMember}>
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