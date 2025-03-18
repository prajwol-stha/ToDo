import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homescreen from './src/screens/Homescreen'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Details from './src/screens/Details'

const App = () => {

  const Stack=createNativeStackNavigator();
  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Homescreen" 
            component={Homescreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Details" 
            component={Details} 
            options={({ route }) => ({
              title: route.params.todoDetails.title, 
              headerShadowVisible:false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  </Provider>
  )
}

export default App

const styles = StyleSheet.create({})