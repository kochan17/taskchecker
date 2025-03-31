import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleAddTask = () => {
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="新しいタスクを入力..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>追加</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TaskInput; 