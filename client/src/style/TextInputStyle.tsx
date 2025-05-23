import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const deviceHeight = Dimensions.get('screen').height

const TextInputStyle = {
  container: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
}

export default TextInputStyle;