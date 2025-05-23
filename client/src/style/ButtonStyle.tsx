import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
const deviceHeight = Dimensions.get('screen').height

const ButtonStyle = {
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
}

export default ButtonStyle;