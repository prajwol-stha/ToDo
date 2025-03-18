import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/features/todo/todoSlice.js'

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})