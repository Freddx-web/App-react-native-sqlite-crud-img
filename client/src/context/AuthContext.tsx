import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(false);
      try {
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedToken) {
          setToken(storedToken);
          const { user } = await authApi.getMe(storedToken);
          setUser(user);
        }
      } catch (error) {
         setError(err.response || 'Falla de Conexion');
      setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    setIsLoading(false);
    try {
      setIsLoading(true);
      const data = await authApi.register({ name, email, password });
      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setIsLoading(false);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const data = await authApi.login({ email, password });
      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setIsLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setToken(null);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};