import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    todos: [],
    counter: 0,
}

const saveTodosToStorage = async (state) => {
    try {
        await AsyncStorage.setItem('todoState', JSON.stringify(state))
    } catch (e) {
        console.error('Failed to save todos to storage', e)
    }
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: state.counter,
                title: action.payload,
                completed: false,
            }
            state.counter += 1
            state.todos.push(todo)
            saveTodosToStorage(state)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            saveTodosToStorage(state)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodosToStorage(state)
            }
        },
        updateTodo: (state, action) => {
            const { id, details } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.details = details;
                saveTodosToStorage(state)
            }
        },
        loadTodos: (state, action) => {
            return action.payload || initialState
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo, updateTodo, loadTodos } = todoSlice.actions

export default todoSlice.reducer