import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'

const deviceHeight = Dimensions.get('screen').height

const BackgroundStyle = {
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BackgroundStyle;