import {makeAutoObservable} from "mobx";
import ITodoItem from "../models/ITodoItem";

export class TodoStore {
    todoList: ITodoItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    actionAddTodo = (newTodo: ITodoItem) => {
        this.todoList.push(newTodo);
    }

    actionRemoveTodo = (id: string) => {
        this.setTodos(this.todoList.filter(item => item.id !== id));
    }

    actionMarkAsDone = (id: string) => {
        this.setTodos(this.todoList.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isDone: !item.isDone
                };
            }
            return item;
        }));
    }

    setTodos = (value: ITodoItem[]) => {
        this.todoList = value;
    };
}