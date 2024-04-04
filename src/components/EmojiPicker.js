import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const emojis = [
  '😊', '😂', '😍', '🥰', '😎', '🤔', '😉', '🥳', '😄', '🎉',
  '😇', '😋', '😘', '🤗', '😜', '🤩', '🤭', '😏', '😃', '😁',
  '😚', '😝', '😌', '🤪', '😆', '😀', '😅', '🙂', '😛', '🥺',
  '😬', '😐', '😶', '😑', '😒', '🙄', '😞', '😔', '😟', '😕',
  '🙁', '😣', '😖', '😫', '😩', '😢', '😭', '😤', '😠', '😡',
  '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻',
  '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
  '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖',
  '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛',
  '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫',
  '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭',
  '💤', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞',
  '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍',
  '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
  '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👣',
  '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄',
  '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱',
  '👨‍🦳', '👨‍🦲', '🧔‍♂️', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳', '👩‍🦲', '🧔‍♀️',
  '🧓', '👴', '👵', '🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅',
  '🙅‍♂️', '🙅‍♀️', '🙆', '🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️', '💁‍♀️', '🙋',
  '🙋‍♂️', '🙋‍♀️', '🧏', '🧏‍♂️', '🧏‍♀️', '🙇', '🙇‍♂️', '🙇‍♀️', '🤦',
  '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️', '🧑‍⚕️', '👨‍⚕️', '👩‍⚕️', '🧑‍🎓',
  '👨‍🎓', '👩‍🎓', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍⚖️', '👨‍⚖️', '👩‍⚖️', '🧑‍🌾',
  '👨‍🌾', '👩‍🌾', '🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍🔧', '👨‍🔧', '👩‍🔧', '🧑‍🏭',
  '👨‍🏭', '👩‍🏭', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🔬', '👨‍🔬', '👩‍🔬', '🧑‍💻',
  '👨‍💻', '👩‍💻', '🧑‍🎤', '👨‍']

const EmojiPicker = ({ onEmojiSelected }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    onEmojiSelected(emoji);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.emojiButton, selectedEmoji === emoji && styles.selected]}
            onPress={() => handleEmojiSelect(emoji)}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height:'200px'
  },
  emojiButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  emoji: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#f0f0f0',
  },
});

export default EmojiPicker;
