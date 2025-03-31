import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from '../../components/TaskInput';
import TaskList from '../../components/TaskList';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks_key');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('タスクの読み込みに失敗しました', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks_key', JSON.stringify(tasks));
    } catch (error) {
      console.log('タスクの保存に失敗しました', error);
    }
  };

  const addTask = (text) => {
    if (text.trim().length === 0) return;
    
    const newTask = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.taskAppContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.taskAppContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>タスクリスト</Text>
        </View>
        
        <TaskList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
        
        <TaskInput onAddTask={addTask} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TaskApp />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  taskAppContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
