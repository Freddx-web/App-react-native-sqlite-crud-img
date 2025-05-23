import React, { useState, useEffect} from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay'


const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  showNameField = false,
}) => {

  return (
    <View>
      <Text style={styles.header}>{headerText}</Text>
      <Spinner visible={isLoading} />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {showNameField && (
        <Input
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      )}
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="Email"
      />
      <Input
        style={styles.input}
        placeholder="Nueva Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={submitButtonText}
        onPress={onSubmit}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthForm;