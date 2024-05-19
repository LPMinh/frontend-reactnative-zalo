
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faMicrophone, faPhoneFlip, faVideo, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription, RTCView, mediaDevices } from 'react-native-webrtc';
import SockJS from 'sockjs-client';
import getUser from '../api/service/loaduser';
import { baseURLWebSocket } from '../constant/baseURL';
import { over } from 'stompjs';
const peerConnection= new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

export default function CallScreen({ navigation, route, isvideocall }) {
  const receiver = route.params?.recevier;
  const [timeWait, setTimeWait] = useState(0);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
 const stompClient = useRef(null);
console.warn("url remote",remoteStream?.toURL());
  useEffect( () => {
    setupWebSocketConnections();
  }, []);
  
   
  
  const startWebcam = async () => {
    const user = await getUser();
    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
    peerConnection.onicecandidate = async (event) => {
      const user = await getUser();
      if (event.candidate) {
        console.error('candidate',event.candidate);
          const candidate = {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.candidate,
          }
          await stompClient.current.send(`/app/candidate`,{},JSON.stringify({
            candidate:candidate,
            receiverId:receiver.email,
            fromUser:user.email}
          ));
    }
  };
   
      

 
  try {
    const stream = await mediaDevices.getUserMedia({
      video: {
        facingMode: 'user', 
      },
      audio: true,
    });
    setWebcamStarted(true);
    setLocalStream(stream);

    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      } catch (error) {
      console.error('Error starting webcam:', error);
      }

      const offer = await peerConnection.createOffer();
      //console.log('offer',offer)
      await peerConnection.setLocalDescription(offer);
      
       //
      await stompClient.current.send(`/app/offer`,{},JSON.stringify({
        offer:{
          type: "offer",
          sdp: offer.sdp,
        },
        receiverId:receiver.email,
        fromUser:user.email}
      ));
  } 

  peerConnection.onicecandidate = async (event) => {
    const user = await getUser();
    if (event.candidate) {
      console.error('candidate',event.candidate);
        const candidate = {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.candidate,
        }
        await stompClient.current.send(`/app/candidate`,{},JSON.stringify({
          candidate:candidate,
          receiverId:receiver.email,
          fromUser:user.email}
        ));
  }
};
 //

  //set up stomp

  const setupWebSocketConnections = async () => {
    const user =  await getUser();
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
    let sock = new SockJS(baseURLWebSocket);
   stompClient.current = over(sock);
   await stompClient.current.connect({}, () => {

      // Subscribe to call topic
      stompClient.current.subscribe(`/user/${user.email}/topic/call`, async (message) => {
        
        //onTrack
        peerConnection.onTrack = (event) => {
          setRemoteStream(event.streams[0]);
        };
        //onIceCandidate
        peerConnection.onicecandidate = async (event) => {
          if (event.candidate) {
            console.error('candidate receiver',event.candidate);
              const candidate = {
                type: "candidate",
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.candidate,
              }
              await stompClient.current.send(`/app/candidate`,{},JSON.stringify({
                candidate:candidate,
                receiverId:receiver.email,
                fromUser:user.email}
              ));
        }
      };
        // create offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        const messageData = JSON.parse(message.body);
        //send offer to receiver
        await stompClient.current.send(`/app/offer`,{},JSON.stringify({
          offer:{
            type: "offer",
            sdp: offer.sdp,
          },
          receiverId:messageData.callFrom,
          fromUser:user.email}
        ));
        
      });


      // subcribe to offer topic
      stompClient.current.subscribe(`/user/${user.email}/topic/offer`, async (message) => {
        const data = JSON.parse(message.body)["offer"];
        // onTrack
         peerConnection.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
        };

        // onIceCandidate
        peerConnection.onicecandidate = async (event) => {
          if (event.candidate) {
            console.error('candidate',event.candidate);
              const candidate = {
                type: "candidate",
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.candidate,
              }
              await stompClient.current.send(`/app/candidate`,{},JSON.stringify({
                candidate:candidate,
                receiverId:JSON.parse(message.body)["fromUser"],
                fromUser:user.email}
              ));
        }
      };
       
        
        if (data) {
          console.error('offer',data.offer)
          const offer = new RTCSessionDescription(data)
          await peerConnection.setRemoteDescription(offer);
          try{
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            const user = await getUser();
            await stompClient.current.send(`/app/answer`,{},JSON.stringify({
              answer:{
                type: "answer",
                sdp: answer.sdp,
              },
              receiverId:JSON.parse(message.body)["fromUser"],
              fromUser:user.email}
            ));
           
          }catch(error){
            console.error('Error starting webcam:', error);
          }          
        }
      });
      // Subscribe to answer topic
       stompClient.current.subscribe(`/user/${user.email}/topic/answer`, async (message) => {
        const data =JSON.parse(message.body)["answer"];
        const answer = new RTCSessionDescription(data);
        try{
          await peerConnection.setRemoteDescription(answer);
        }catch(error){
          console.error('Error starting webcam:', error);
        }
      });
       // Subscribe to candidate topic
       stompClient.current.subscribe(`/user/${user.email}/topic/candidate`, (message) => {
        const data = JSON.parse(message.body)['candidate'];
        var iceCandidate = new RTCIceCandidate({
          candidate: data["id"],
          sdpMLineIndex: parseFloat(data["label"]),
          sdpMid: data["label"],          
        })
        peerConnection.addIceCandidate(iceCandidate);
      });
    });

  };

  // const startWebcam = async () => {
  //   if (!webcamStarted) {
  //     try {
  //       peerConnection.onicecandidate = async (event) => {
  //         const user = await getUser();
  //         if (event.candidate) {
  //           const candidate = {
  //             type: "candidate",
  //             label: event.candidate.sdpMLineIndex,
  //             id: event.candidate.candidate,

  //           };
  //           stompClient.current.send(`/app/candidate`,{},JSON.stringify({candidate:candidate,receiverId:receiver.email,fromUser:user.email})); // Gửi candidate cho bên kia qua WebSocket
  //         }
  //       };
  //       const stream = await mediaDevices.getUserMedia({
  //         video: true,
  //         audio: true,
  //       });
  //       setWebcamStarted(true);
  //       setLocalStream(stream);
  //       stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  //     } catch (error) {
  //       console.error('Error starting webcam:', error);
  //     }
  //   }
  // };
 
 

  return (
    <SafeAreaView style={styles.boxsticker}>
      <View style={styles.header}>
            <TouchableOpacity style={styles.button_header} onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ fontSize: 40, color: 'white', textAlign: 'center', lineHeight: 0, width: '70%' }}>Zalo</Text>
            <TouchableOpacity style={styles.button_header} onPress={startWebcam}>
              <FontAwesomeIcon icon={faVideo} size={30} color='white' />
            </TouchableOpacity>
      </View>
      <View style={styles.body}>
                 <Image source={{uri: receiver?.avatar}} style={{width:200,height:200,borderRadius:100}}/>
                 <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{receiver?.name}</Text>
                 <Text style={{fontSize:20,color:'white'}}>
                   {timeWait>=60? "Không trả lời":"đang gọi:..."+ timeWait+" s"}
                 </Text>
      </View>
              {timeWait<60 &&
              <View style={styles.footer}>
                  <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                      <TouchableOpacity style={styles.button}>
                          <FontAwesomeIcon icon={faVolumeHigh} size={30} color='white'/>
                      </TouchableOpacity>
                      <Text style={{fontSize:20,color:'white'}}>Loa</Text>
                  </View>
                  <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                      <TouchableOpacity style={{width:70,height:70,borderRadius:35,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                          <FontAwesomeIcon icon={faPhoneFlip} size={30} color='white'/>
                      </TouchableOpacity>
                      <Text style={{fontSize:20,color:'white'}}>Kết thúc</Text>
                  </View>
                  <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                      <TouchableOpacity style={styles.button}>
                          <FontAwesomeIcon icon={faMicrophone} size={30} color='white'/>
                      </TouchableOpacity>
                      <Text style={{fontSize:20,color:'white'}}>Mic</Text>
                  </View>
             </View>}
             
      {remoteStream ?
      <View style={styles.container_video}>
        <RTCView streamURL={remoteStream?.toURL()} objectFit="cover" style={{width:'100%',height:'100%'}} mirror/>
        <RTCView streamURL={localStream?.toURL()} objectFit="cover" style={{width:100,height:100,position:'absolute',top:20,right:20}} />
      </View>
        : 
        <RTCView streamURL={localStream?.toURL()} objectFit="cover" style={styles.container_phone} />}
      

    </SafeAreaView>
    // 
  );
}

const styles = StyleSheet.create({
  boxsticker: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0073FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container_video: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: '#0073FF',
  },
  container_phone: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#0073FF',
  },
  header: {
    width: '100%',
    height: '5%',
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    zIndex: 100,
  },
  body:{width:'100%',height:'50%',position:'absolute',zIndex:101,flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'},
  footer:{width:'100%',height:'30%',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',position:'absolute',bottom:20,zIndex:101},
  button_header: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
