import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../components/Button'
import TodoComponent from '../components/TodoComponent'

const Homepage = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState({});
    const [counter, setCounter] = useState(1);
    
    function handleAddTodo() {
        if (title.trim() === '') return;
        
        const newTodo = {
            id: counter, 
            title: title,
            completed: false,
            details: '',
        };
        
        setTodos([...todos, newTodo]);
        setTitle('');
        setCounter(counter + 1);
    }
    
    function handleDeleteTodo(item) {
        console.log('Deleting', item.id);
        setTodos(todos.filter(todo => todo.id !== item.id));
    }
    
    function handleTodoPress(item) {
        console.log('Pressed', item.id);
        setTodos(todos.map(todo => 
            todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
        ));
    }
    
  function handleExpand(id) {
        if (id === undefined) {
            console.error('Cannot toggle todo.');
            return;
        }
        
        const item = todos.find(todo => todo.id === id);
        console.log('Details pressed for item:', item);
        
        setDetails(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    function updateTodoDetails(id, details) {
        if (id === undefined) {
            console.error('No todo found');
            return;
        }
        
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, details } : todo
        ));
        
        console.log(`Details updated for todo ${id}.`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={todos}
                    renderItem={({item}) => (
                        <TodoComponent 
                          item={item}
                          details={details}  
                          handleExpand={handleExpand}
                          handleTodoPress={handleTodoPress}
                          handleDeleteTodo={handleDeleteTodo}
                          updateTodoDetails={updateTodoDetails}
                        />
                      )}
                    keyExtractor={(item) => item.id.toString()}
                    
                    ListEmptyComponent={
                        <View style={{alignItems:'center', marginTop: 20}}>
                            <Text>No todos yet. Add one below!</Text>
                        </View>
                    }
                    ListHeaderComponent={
                        <View style={{alignItems:'center', marginBottom: 16}}>
                            <Text style={styles.heading}>Save your To-Dos</Text>
                        </View>
                    }
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Add item"
                    placeholderTextColor={COLORS.M_GREY}
                    keyboardType="default"
                    cursorColor={COLORS.DARK}
                    
                />
                <Button
                    title={'Add'}
                    onPress={handleAddTodo}
                    disabled={!title}
                    style={{height:48}}
                />
            </View>
        </View>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.LIGHT,
        flex: 1,
        padding: 16,
        flexDirection: 'column', 
    },
    listContainer: {
        flex: 1,
    },
    heading:{
        color: COLORS.DARK,
        fontSize: 24,
        fontWeight: '600'
    },
    todoWrapper: {
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    todo:{
        flex: 1,
        backgroundColor: COLORS.L_GREY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
    },
    chevronContainer: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer:{
        padding: 16,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: 8,
    },
    title:{
        color: COLORS.DARK,
        textDecorationLine: 'none',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: COLORS.DARK,
    },
    deleteContainer:{
        padding: 16,
    },
    detailsContainer: {
        backgroundColor: COLORS.LIGHT,
        borderWidth: 1,
        borderColor: COLORS.L_GREY,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8,
    },
    detailsInput: {
        minHeight: 60,
        color: COLORS.DARK,
        padding: 8,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingBottom: 4,
    },
    input: {
        flex: 1,
        borderColor: COLORS.GREEN,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        height: 48,
    }, 
    addButton: {
        backgroundColor: COLORS.GREEN,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
    },
    buttonText:{
        color: COLORS.LIGHT
    },
    detailsTextContainer: {
      marginTop: 8,
  },
  detailsText: {
      color: COLORS.DARK,
  },
  viewMoreText: {
      color: COLORS.GREEN,
      fontWeight: '600',
      marginTop: 4,
  },
})

