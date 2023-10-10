import ITodoItem from "../models/ITodoItem";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ToDoState {
    todoList: ITodoItem[];
}

const initialState: ToDoState = {
    todoList: []
};

interface RootState {
    todo: {
        todoList: ITodoItem[];
    };
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodoItem(state, action: PayloadAction<ITodoItem>) {
            state.todoList.push(action.payload);
        },
        removeTodoItem(state, action: PayloadAction<string>) {
            state.todoList = state.todoList.filter(
                (item) => item.id !== action.payload
            );
        },
        completeTodoItem(state, action: PayloadAction<string>) {
            state.todoList = state.todoList.map((item) => {
                if (item.id === action.payload) return {
                    id: item.id,
                    title: item.title,
                    createdDate: item.createdDate,
                    isDone: !item.isDone
                }
                return item;
            });
        },
    },
});

export const {addTodoItem, removeTodoItem, completeTodoItem} = todoSlice.actions;
export {RootState};
export default todoSlice.reducer;