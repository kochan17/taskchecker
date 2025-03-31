import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? '#4CAF50' : '#757575'}
        />
      </TouchableOpacity>
      
      <Text
        style={[
          styles.text,
          task.completed && styles.completedText
        ]}
      >
        {task.text}
      </Text>
      
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={22} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    padding: 5,
  },
});

export default TaskItem; 