import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const deviceHeight = Dimensions.get('screen').height

const ParagraphStyle = {
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 10,
  },
}

export default ParagraphStyle;