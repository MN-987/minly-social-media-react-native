import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const UploadButton = () => {
    console.log("UploadButton.jsx entered")
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = async (mediaType) => {
    let pickerResult;
    if (mediaType === 'image') {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      console.log('Image picker result:', pickerResult);
    } else if (mediaType === 'video') {
      pickerResult = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
      });
    }

    if (!pickerResult.cancelled) {
        console.log('Selected file one:', pickerResult.assets[0].uri);
      setSelectedFile(pickerResult.assets[0].uri);
      console.log('Selected file two:', selectedFile);
    }
  };

  const handleUpload = async () => {
    console.log('Uploading file:', selectedFile);
    if (selectedFile) {
      try {
   
        const formData = new FormData();
        formData.append('file', {
          uri: selectedFile,
          name: selectedFile.split('/').pop(), // Extract file name from URI
          type: selectedFile.endsWith('.jpg') ? 'image/jpeg' : 'video/mp4', // Adjust the type based on the file extension
        });
        formData.append('uploaderUserId', '6611719d19649772047095be');
        const response = await axios.post(`https://minly-social-network-backend.onrender.com/api/v1/media/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
        console.log('Upload successful:', response.data);

        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    } else {
      console.log('Please select a file before uploading.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleFileChange('image')} style={styles.button}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFileChange('video')} style={styles.button}>
        <Text style={styles.buttonText}>Choose Video</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.selectedFileContainer}>
          <Text style={styles.fileName}>upload image</Text>
          <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.helpText}>PNG, JPG, or GIF (MAX. 800x400px)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  helpText: {
    fontSize: 12,
    color: '#95a5a6',
  },
});

export default UploadButton;
