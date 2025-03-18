import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homepage from './src/screens/Homepage'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Homepage/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})