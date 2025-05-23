import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Modal,Text } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register, error, isLoading } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    try {
      await register(name, email, password);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate('Login');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <Text style={styles.modalText}>¡Login Successful!</Text>
          </View>
        </View>
      </Modal>

      <AuthForm
        headerText="Crear cuenta nueva"
        errorMessage={error}
        onSubmit={handleSubmit}
        submitButtonText="Registrame"
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        showNameField
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
              
        <Text>Iniciar Session</Text>
                
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default RegisterScreen;