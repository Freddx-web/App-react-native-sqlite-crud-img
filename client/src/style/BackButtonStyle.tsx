import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const deviceHeight = Dimensions.get('screen').height

const BackButtonStyle = {
  container: {
    position: 'absolute',
    top: 30 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 34,
    height: 34,
  },
}

export default BackButtonStyle;