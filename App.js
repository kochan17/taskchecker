import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import TaskApp from './components/TaskApp';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TaskApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 