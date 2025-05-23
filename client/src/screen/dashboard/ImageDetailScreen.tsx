import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.description}>{image.description}</Text>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('EditImage', { image, refresh: route.params.refresh })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  details: {
    marginTop: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ImageDetailScreen;