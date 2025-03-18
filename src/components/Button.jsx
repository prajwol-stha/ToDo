import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Button = ({title,onPress,disabled,style}) => {
  return (
    <TouchableOpacity style={[styles.addButton,style]} onPress={onPress} disabled={disabled}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    addButton: {
            backgroundColor: COLORS.GREEN,
            paddingHorizontal: 20,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical:8,
        },
        buttonText:{
            color: COLORS.LIGHT
        },
})