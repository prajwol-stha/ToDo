import { createSlice, nanoid} from "@reduxjs/toolkit";

const initialState={
    todos:[],
    counter:0,
}

export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        //property, and function
        addTodo:(state,action)=>{
            const todo={
                id: state.counter,
                title: action.payload,
                completed: false,
                // details: ''
            }
            state.counter += 1
            state.todos.push(todo)
        },
        deleteTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            console.log('TODOODOO, ',todo)
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        updateTodo: (state, action) => {
            const { id, details } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
              todo.details = details;
            }
          }
        
    }
})

export const {addTodo,deleteTodo,toggleTodo,updateTodo} =todoSlice.actions

export default todoSlice.reducer //34:23