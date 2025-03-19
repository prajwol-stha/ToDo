import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react'
import Homescreen from './src/screens/Homescreen'
import { Provider, useDispatch } from 'react-redux'
import { store } from './src/redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Details from './src/screens/Details'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadTodos } from './src/redux/features/todo/todoSlice'
import { KeyboardAvoidingView } from 'react-native';

const TodoLoader = ({ children }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const loadStoredTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todoState')
        if (storedTodos) {
          dispatch(loadTodos(JSON.parse(storedTodos)))
        }
      } catch (e) {
        console.error('Failed to load todos from storage', e)
      }
    }
    
    loadStoredTodos()
  }, [dispatch])
  
  return children
}

const App = () => {
  const Stack = createNativeStackNavigator();

  
  return (
    <Provider store={store}>
      <TodoLoader>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="Homescreen" 
                component={Homescreen} 
                options={{ headerShown: false}} 
              />
              <Stack.Screen 
                name="Details" 
                component={Details} 
                options={({ route }) => ({
                  title: route.params.todoDetails.title, 
                  headerShadowVisible: false
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </TodoLoader>
    </Provider>
  )
}

export default App
