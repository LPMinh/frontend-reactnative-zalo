import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import getUser from "../api/service/loaduser";
import { createGroup } from "../api/service/group";
import { getRooms } from "../api/service/room";
import { extractName, getColorForName } from "../api/service/ExtractUserName";
export default function CreateGroupScreen({navigation}) {
    const friendFromRedux = useSelector((state) => state.notifyAddFriend.friendList);
    const [image,setImage]=useState(null);
    const [name,setName]=useState('');
    const [search,setSearch]=useState('');
    const [memberSelected,setMemberSelected]=useState([]);
    const [friendlist,setfriendlist] = useState(useSelector((state) => state.notifyAddFriend.friendList));
    useEffect(()=>{
       if(search==='') return setfriendlist(friendFromRedux);
       setfriendlist(friendlist.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())));

    },[search]);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
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
    const fetchRooms = async () => {
        const user = await getUser();
        const rooms = await getRooms(user.email);
        console.log(rooms);
        dispatch(setListRoom(rooms.roomResponses));
      }
    const handleCreateGroup= async()=>{
        const user = await getUser();
        try{
            let localUri = image;
            let filename = localUri.split('/').pop();
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const multipart = { uri: localUri, name: filename, type };
            const result = await createGroup(name,user.email,user.name,multipart,memberSelected)
                Alert.alert('Thông báo', 'Tạo nhóm thành công');
                await fetchRooms();
               return navigation.goBack();
            
        }catch(e){
            console.log(e);
        }
        
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'#0895FB',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:10}}>
                 <TouchableOpacity onPress={()=>navigation.navigate('tab')}>
                    <Image source={require('../images/icon/left-arrow.png')} style={{ width:30, height:30 }} /> 
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:14,marginLeft:10}}>Nhóm mói</Text>
            </View>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:10}}>
                <TouchableOpacity style={{borderRadius:50,backgroundColor:'white'}} onPress={pickImage}>
                    {image?<Image source={{uri:image}} style={{width:80,height:80,borderRadius:50}}/>:<Image source={require('../images/icon/camera.png')} style={{width:100,height:100}}/>}
                </TouchableOpacity>
                <TextInput style={{width:'70%',height:30,backgroundColor:'white',borderRadius:5,marginLeft:10}} placeholder='Tên nhóm' onChangeText={setName}/>
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
                keyExtractor={(item) => item.id}
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
            </View>
            <TouchableOpacity style={{width:'100%',height:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} onPress={handleCreateGroup}>
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Tạo nhóm</Text>
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