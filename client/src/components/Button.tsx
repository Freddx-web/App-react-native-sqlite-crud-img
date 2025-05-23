import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'
import ButtonStyle from "../style/ButtonStyle"

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        ButtonStyle.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={ButtonStyle.text}
      mode={mode}
      {...props}
    />
  )
}