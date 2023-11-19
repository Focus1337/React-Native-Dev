import TodoRepository from "./TodoRepository";
import {TodoModel} from "./TodoModel";

export default class TodoService {
    private readonly todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    getTodosAsync = async () =>
        await this.todoRepository.getAllAsync();

    addTodo = (model: TodoModel[], item: TodoModel) => {
        model.push(item);
        return model;
    };

    removeTodo = (model: TodoModel[], id: string) => {
        return model.filter(todo => todo.id !== id);
    };

    markAsCompleteTodo = (model: TodoModel[], id: string) =>
        model.map(item => {
            if (item.id === id) {
                return {...item, completed: !item.completed};
            }
            return item;
        });
}
