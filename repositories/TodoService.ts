import TodoRepository from "./TodoRepository";
import {TodoModel} from "../models/TodoModel";

export default class TodoService {
    private readonly todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    getTodos = async () =>
        this.todoRepository.getAllAsync();

    addTodo = async (model: TodoModel[], item: TodoModel) => {
        model.push(item);
        return model;
    };

    removeTodo = async (model: TodoModel[], id: string) => {
        return model.filter(todo => todo.id !== id);
    };

    markAsCompleteTodo = async (model: TodoModel[], id: string) => {
        return model.map(item => {
            if (item.id === id) {
                return {...item, completed: !item.completed};
            }
            return item;
        });
    };
}