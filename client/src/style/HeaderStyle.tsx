import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
const deviceHeight = Dimensions.get('screen').height

const HeaderStyle = {
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
}

export default HeaderStyle;