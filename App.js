import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PostList from './features/Posts/PostList';
import Test from './features/test/Test';
import UploadButton from './ui/UploadButton/UploadButton';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      
        <UploadButton style={styles.uploadButton}  />
        <PostList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    marginTop: 20, // Add margin top here
  }
});
