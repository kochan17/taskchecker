import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/navigation';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 