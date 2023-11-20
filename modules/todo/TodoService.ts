import TodoRepository from "./TodoRepository";
import {TodoModel} from "./TodoModel";
import {RemoteTodoModel} from "./RemoteTodoModel";
import {v4 as uuidv4} from "uuid";

export default class TodoService {
    private readonly todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    getTodosAsync = async (): Promise<TodoModel[]> => {
        let data = await this.todoRepository.getAllAsync();

        return data.map((model: RemoteTodoModel) => ({
            id: uuidv4(),
            title: model.title,
            completed: model.completed
        }));
    };

    addTodo = (model: TodoModel[], item: TodoModel): TodoModel[] => {
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
