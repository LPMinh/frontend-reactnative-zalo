// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image, SectionList } from 'react-native';
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
// // import { mediaDevices } from 'react-native-webrtc';


// export default function Video(hangup,localStream,remoteStream) {
//   // on call we will just display the local stream
//   if(localStream && ! remoteStream){
//     return 
//     <View style={styles.container_video}>
//       <RTCView streamURL={localStream.toURL()} style={{width:'100%',height:'100%'}}/>
//       <TouchableOpacity style={styles.button} onPress={hangup}>
//         <FontAwesomeIcon icon={faPhoneSlash} size={30} color='white'/>
//       </TouchableOpacity>
//     </View>
//   }
//   // once the call is connected we will display the remote stream
//   if(localStream && remoteStream){
//     return 
//     <View style={styles.container_video}>
//       <RTCView streamURL={remoteStream.toURL()} style={{width:'100%',height:'100%'}}/>
//       <TouchableOpacity style={styles.button} onPress={hangup}>
//         <FontAwesomeIcon icon={faPhoneSlash} size={30} color='white'/>
//       </TouchableOpacity>
//     </View>
//   }
// }

// const styles = StyleSheet.create({
//   boxsticker: {
//     flex:1,
//     flexDirection:'column',
//     backgroundColor: '#0073FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width:'100%',
//     height:'100%',
//   },
//   container_video:{
//     flex:1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   container_phone:{
//     width:'100%',
//     height:'100%',
//     display:'flex',
//     flexDirection:'column',
//     alignItems:'center',
//     justifyContent:'space-evenly',
//     backgroundColor:'#0073FF'
//   },
//   header:{
//     width:'100%',
//     height:'5%',
//     position:'absolute',
//     top:20,
//     alignItems:'center',
//     justifyContent:'space-evenly',
//     flexDirection:'row',
//     zIndex:100
//   },
//   button_header:{
//     padding:10,
//     backgroundColor:'gray',
//     borderRadius:50,
//     backgroundColor:'rgba(0,0,0,0.5)'
//   },
//   button:{
//     width:70
//     ,height:70,
//     borderRadius:35,
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor:'green'
//   }
// });