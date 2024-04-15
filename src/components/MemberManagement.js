import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faArrowRightRotate, faBell, faKey, faLeaf, faMagnifyingGlass, faSignOutAlt, faUserEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { addAdmin, createGroup, getGroupById, removeAdmin, removeMember } from "../api/service/group";
import { getRoom } from "../api/service/room";
import findUserByEmail from "../api/service/user";
import { Modal } from 'react-native';
import { extractName, getColorForName } from "../api/service/ExtractUserName";

export default function MemberManagerment({navigation,route}) {
    const [group,setGroup]=useState(route.params.group);
    const members=(useSelector(state=>state.groupChat.ListMember));
    const [listMember,setListMember]=useState(members);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [memberSelected,setMemberSelected]=useState([]);
    const [listMemberNotAdmin,setListMemberNotAdmin]=useState([]);
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [selected,setSelected]=useState(null);
    const fetchMembers = useCallback(async () => {
        const user = await getUser();
        const group1 = await getGroupById(group.id);
        if (group1.members) {
            const members = [];
            for (let i = 0; i < group1.members.length; i++) {
                const member = await findUserByEmail(group1.members[i]);
                members.push(member);
            }
            console.warn(members);
            setListMember(members);
            setListMemberNotAdmin(getListNotAdmin(members));
        }
    }, [group.members]);

    const reFetchMembers = async () => {
        const group1 = await getGroupById(group.id);
        if (group1.members) {
            const members = [];
            for (let i = 0; i < group1.members.length; i++) {
                const member = await findUserByEmail(group1.members[i]);
                members.push(member);
            }
            console.warn(members);
            setGroup(group1);
            setListMember(members);
            setListMemberNotAdmin(getListNotAdmin(members));
        }
    }
    const handleRemoveMember = useCallback(async (email) => {
        const user = await getUser();
        try {
            await removeMember(group.id, email, user.email);
            await reFetchMembers();
           return setModalRemoveVisible(false);
        } catch (error) {
            console.error(error);
        }
    }, [group.id]);
    const handleAddAdmins = async () => {
        const user = await getUser();
        console.log(memberSelected);
        try {
            for (const item of memberSelected) {
                await addAdmin(group.id, item, user.email);
                await reFetchMembers();
            }
           
            setMemberSelected([]);
            return setModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);
    const checkOwner=(email)=>{
        if(group?.owner===email){
            return true;
        }
        return false;
    }
    const checkAdmin=(email)=>{
        if(group?.admins.includes(email)){
            return true;
        }
        return false;
    }
const getListNotAdmin = () => {
    const list = [];
    if (listMember && Array.isArray(listMember)) {
        for (let i = 0; i < listMember.length; i++) {
            if (!checkAdmin(listMember[i].email)&&!checkOwner(listMember[i].email)) {
                list.push(listMember[i]);
            }
        }
    }
    return list;
};
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
    
    const handleRemoveAdmin= async (email)=>{
        const user = await getUser();
        try {
            await removeAdmin(group.id,user.email,email);
            await reFetchMembers();
            return setModalRemoveVisible(false);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Quản lý thành viên</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("addMember",{'members':listMember,'groupId':group.id})} style={{position:'absolute',right:10}}>
                    <Image
                    source={require('../images/icon/add.jpg')}
                    style={{ width: 30, height: 30 }}
                    />
                 </TouchableOpacity>
            </View>
            <Text style={{fontSize:16,fontWeight:'bold',padding:10,color:'#0895FB'}}>thành viên</Text>
            <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10,borderWidth:1}} onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={faUserGroup} style={{color:'#0895FB',fontSize:20} } />
                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10}}>Thêm Phó Nhóm</Text>
            </TouchableOpacity>
            <FlatList
                data={listMember}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}} onPress={()=>{setSelected(item.email);setModalRemoveVisible(true)}}>
                        {item.avatar ? <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/>:
                                <View style={{height:50,width:50,borderRadius:50,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                                    <Text >{extractName(item.name)}</Text>
                                </View>}
                        {checkOwner(item.email)?<FontAwesomeIcon icon={faKey} style={{color:'gold',fontSize:20,marginLeft:5}}/>:<></>}
                        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10}}>{item.name}</Text>
                        {checkOwner(item.email)?<Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,color:'gold'}}>(Chủ nhóm)</Text>:<></>}
                        {checkAdmin(item.email)?<Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,color:'gold'}}>(Phó nhóm)</Text>:<></>}
                       
                    </TouchableOpacity>
                    
                )}
            />
             <Modal  visible={modalRemoveVisible} transparent={true} onRequestClose={()=>{setModalRemoveVisible(false)}}>
                            <View style={[styles.modalContainer]}>
                                <View style={{width:300,height:200,backgroundColor:'white',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:16,fontWeight:'bold',color:'#0895FB',marginBottom:10}}>Xóa thành viên</Text>
                               {!checkOwner(selected)? <TouchableOpacity style={{width:100,height:40,backgroundColor:'red',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={()=>{handleRemoveMember(selected)}}><Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Xóa</Text></TouchableOpacity>:<></>}
                               {checkAdmin(selected)?<TouchableOpacity style={{width:100,height:40,backgroundColor:'yellow',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={()=>{handleRemoveAdmin(selected)}}><Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>gỡ quyền admin</Text></TouchableOpacity>:<></>}
                                <TouchableOpacity style={{width:100,height:40,backgroundColor:'#0895FB',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={()=>{setModalRemoveVisible(false)}}><Text>Thoát</Text></TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
            
            <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(false);
    }}
>
    <View style={styles.modalContainer}>
        {/* Modal content here */}
        <View style={{width:300,height:200,backgroundColor:'white',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#0895FB',marginBottom:10}}>Thêm Phó Nhóm</Text>
            <FlatList
                
                data={getListNotAdmin()}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10 }}>
                        <TouchableOpacity style={{width:30,height:30,borderRadius:50,borderWidth:1,backgroundColor:isSelected(item.email)?'gray':'white' }}  onPress={()=>{handleSelectMember(item.email)}}></TouchableOpacity>
                        {item.avatar ? <Image style={{height:50,width:50,borderRadius:50}} source={{uri:item?.avatar}}/>:
                                <View style={{height:50,width:50,borderRadius:50,marginLeft:20,backgroundColor:getColorForName(item.name),justifyContent:'center',alignItems:'center'}}>
                                    <Text >{extractName(item.name)}</Text>
                                </View>}
                        <Text style={{marginLeft:10}}>{item.name}</Text>
                    </View>

                )}
                />
                <TouchableOpacity style={{width:100,height:40,backgroundColor:'#0895FB',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={handleAddAdmins}><Text>Thêm</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>Close Modal</Text>
                </TouchableOpacity>

        </View>

        
    </View>
</Modal>
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
    modalContainer: {
        flex: 1,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});