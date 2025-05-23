import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/images'; // Replace with your local IP

const EditImageScreen = ({ route, navigation }) => {
  const { image, refresh } = route.params;
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description || '');
  const [updating, setUpdating] = useState(false);

  const updateImage = async () => {
    if (!title) {
      alert('Agrega el Titulo');
      return;
    }

    setUpdating(true);

    try {
      await axios.put(`${API_URL}/${image.id}`, { title, description });
      if (refresh) {
        refresh();
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Error updating image');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title={updating ? 'Updating...' : 'Update Image'}
        onPress={updateImage}
        disabled={updating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default EditImageScreen;