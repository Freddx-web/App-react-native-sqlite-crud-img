import React, { useContext, useState, useEffect  } from 'react';
import { View, Text,TextInput, ScrollView, ActivityIndicator,
   StyleSheet,StatusBar, Button, Image, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api'; // URL de backend
const API_URL = 'http://localhost:3000/api/images';

const ProfileScreen = ({ route, navigation }) => {
  const { user, logout } = useContext(AuthContext);
  //

const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    if (!title || !image || !description) {
      alert('Please provide a title and select an image');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || `photo_${Date.now()}.jpg`,
    });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (route.params?.refresh) {
        route.params.refresh();
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
      
      {user && (
        <>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
        </>
      )}


      <Button title="Logout" onPress={() => navigation.replace('Register')}/>

      <>

      <TextInput
        style={styles.input}
        placeholder="Titulo"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descriptcion"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="camera" size={50} color="#ccc" />
            <Text>Selectionar image muebles</Text>
          </View>
        )}
      </TouchableOpacity>
      <Button
        title={uploading ? 'Subiendo...' : 'Subido Image'}
        onPress={uploadImage}
        disabled={uploading}
      />

      </>

    </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  imagePicker: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProfileScreen;