import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import TextInputStyle from "../style/TextInputStyle"

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={TextInputStyle.container}>
      <Input
        style={TextInputStyle.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={TextInputStyle.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={TextInputStyle.error}>{errorText}</Text> : null}
    </View>
  )
}