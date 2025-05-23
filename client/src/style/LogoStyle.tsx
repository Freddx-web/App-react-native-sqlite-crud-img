import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
const deviceHeight = Dimensions.get('screen').height

const LogoStyle = {
  image: {
    width: 180,
    height: 180,
    marginBottom: 8,
  },
}

export default LogoStyle;