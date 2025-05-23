import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { theme } from '../core/theme'
const deviceHeight = Dimensions.get('screen').height

const DashboardView = {
  dashboardContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  menuButtonText: {
    top:10,
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
  },

}
  

export { DashboardView };