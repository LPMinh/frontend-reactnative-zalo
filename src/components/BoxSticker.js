import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image, SectionList } from 'react-native';
import BoxTypeTicker from './BoxTypeTicker';
import EmojiPicker from './EmojiPicker';
import { useDispatch } from 'react-redux';
import { setEmoji } from '../reduxtoolkit/slice/ChatReducer';



export default function BoxSticker() {
 const [selectedListTicker,setSelectedListTicker]=useState(0);
 const handleFindListTickerSelected=(id)=>{
    const listFind= dataTickers.find(item=>item.id===id);
    return listFind;
 }
 const dispatch = useDispatch();
 const handleEmojiSelected=(emoji)=>{
  dispatch(setEmoji(emoji));
 }
 const dataTickers=[
   {
      id:0,
      name:'emoji',
      reviewImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
   }
   ,
   {
      id:1,
      name:'sticker meme mèo',
      reviewImg:'https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg',
      data:[
        {
            name:'cat 1',
            url:'https://media1.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b952d111da9bea4fy4yuhxtvjyfzql8r6ajfxaofgi4b&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        },
        {
            name:'cat 2',
            url:'https://media1.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b952d111da9bea4fy4yuhxtvjyfzql8r6ajfxaofgi4b&ep=v1_gifs_search&rid=giphy.gif&ct=g'

        },
        {
            name:'cat 3',
            url:'https://media1.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b952d111da9bea4fy4yuhxtvjyfzql8r6ajfxaofgi4b&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        },
        {
            name:'cat 4',
            url:'https://media1.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b952d111da9bea4fy4yuhxtvjyfzql8r6ajfxaofgi4b&ep=v1_gifs_search&rid=giphy.gif&ct=g'

        },
       
        
      ]    
   },
   {
    id:2,
    name:'sticker meme doremon',
    reviewImg:'https://i.pinimg.com/736x/1e/c8/f4/1ec8f463568b4cfae39a71b3c1b20abc.jpg',
    data:[
      {
          name:'doremon 1',
          url:'https://i.pinimg.com/originals/0f/c2/f4/0fc2f4da6706b52755c7e6ceb9652f60.gif'
      },
      {
          name:'doremon 2',
          url:'https://i.pinimg.com/originals/0f/c2/f4/0fc2f4da6706b52755c7e6ceb9652f60.gif'

      },
      {
          name:'doremon 3',
          url:'https://i.pinimg.com/originals/0f/c2/f4/0fc2f4da6706b52755c7e6ceb9652f60.gif'
      },
      {
          name:'doremon 4',
          url:'https://i.pinimg.com/originals/0f/c2/f4/0fc2f4da6706b52755c7e6ceb9652f60.gif'

      }
      
    ]    
 }


  ]

  return (
    <View style={styles.boxsticker}>

       <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',width:'100%'}}>
         {          
            dataTickers.map((item,index)=>{
              return(
                <TouchableOpacity key={index} style={{ display:'flex',width:30,height:30,marginRight:30,borderWidth:1,borderColor: item.id===selectedListTicker?"red":"white"}} onPress={()=>{setSelectedListTicker(item.id)}}>
                  <Image source={{uri:item.reviewImg}} style={{width:30,height:30,resizeMode:'cover',borderRadius:50}}></Image>
                </TouchableOpacity>
              )
            })
         }
        </View> 
          {
            selectedListTicker!==0?<BoxTypeTicker item={handleFindListTickerSelected(selectedListTicker)}/>:<EmojiPicker onEmojiSelected={handleEmojiSelected} />
          }
    </View>
  );
}

const styles = StyleSheet.create({
  boxsticker: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'auto',
  },


 

});