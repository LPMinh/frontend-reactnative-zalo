import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import DiscoveryScreen from './DiscoveryScreen';
import DiaryScreen from './DiaryScreen';
import MyProfileScreen from './MyProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faComment, faHouse, faHouseChimneyWindow, faMugSaucer, faPersonWalkingDashedLineArrowRight, faRocket, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-native';

function BottomTab() {
    const Tab = createBottomTabNavigator();
    return ( 
            <Tab.Navigator
                screenOptions={
                    {
                         headerShown: false,
                         tabBarInactiveTintColor:'#398EFB',
                         tabBarLabelStyle:{
                              fontSize:15
                         },
                         tabBarStyle:{
                              paddingVertical:10,
                              marginBottom:20
                         },
                         headerStyle:{
                              backgroundColor:'#0895FB',
                         },
                            headerLeft:()=>(
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color={'red'} style={{marginLeft:10}}></FontAwesomeIcon>
                                   <TouchableOpacity>
                                    <Text style={{color:'white',marginLeft:10,fontSize:15}}>Tìm kiếm</Text>
                                   </TouchableOpacity>
                              </View>
                             
                            ),
                            title:''
                         
                    }
                }
            >  
                 <Tab.Screen name="Chat"  component={ChatScreen} 
                    options={{
                         tabBarIcon: ({focused})=>{
                              const chatIcon =focused ? require('../images/icon/chat-focus.jpg'):require('../images/icon/chat.jpg');
                              return(
                                 <Image source={chatIcon} style={{width:30,height:30}}></Image>
                              )
                         },
                         title:'Tin nhắn'
                         
                         
                    }}
                 ></Tab.Screen>
                 <Tab.Screen name="Contact" component={ContactScreen}
                    options={{
                         tabBarIcon: ({focused})=>{
                              const contactIcon = focused ? require('../images/icon/contact-active.jpg'):require('../images/icon/contact.jpg');
                             
                              return(
                                   <Image source={contactIcon} style={{width:30,height:30}}></Image>

                              )
                         },
                         title:'Danh bạ'
                         
                    }}
                 />
                 <Tab.Screen name="Discovery" component={DiscoveryScreen}
                    options={{
                         tabBarIcon: ({focused})=>{
                             const discoveryIcon= focused ? require('../images/icon/discovery-active.jpg'):require('../images/icon/discovery.jpg');
                              return(
                                  <Image source={discoveryIcon} style={{width:30,height:30}}></Image>
                                     
                              )
                         },
                         title:'Khám phá'
                    }}
                 />
                 <Tab.Screen name="Diary" component={DiaryScreen}
                  options={{
                    tabBarIcon: ({focused})=>{
                        const diaryIcon= focused ? require('../images/icon/log-active.jpg'):require('../images/icon/log.jpg');
                         return(
                             <Image source={diaryIcon} style={{width:30,height:30}}></Image>
                                
                         )
                    },
                    title:'Nhật Ký'
                  }}
                 />
                 <Tab.Screen  name="Profile" component={MyProfileScreen}
                 options={{tabBarIcon: ({focused})=>{
                    const profileIcon= focused ? require('../images/icon/info-active.jpg'):require('../images/icon/info.jpg');
                     return(
                         <Image source={profileIcon} style={{width:30,height:30}}></Image>
                            
                     )
                    },
                    title:'Cá nhân'
                 }}
                 />
            </Tab.Navigator>

     )
    
     ;
}

export default BottomTab;