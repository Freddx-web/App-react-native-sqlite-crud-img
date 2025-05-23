import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Button, Text } from 'react-native';

import AuthForm from '../../components/AuthForm';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login, error, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigation.navigate('Profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Crear Cuenta Nueva"
        errorMessage={error}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Register')}>
        
        <Text>Register</Text>
          
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
    paddingHorizontal: 20,
  },
  button: {
    top:10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default LoginScreen;