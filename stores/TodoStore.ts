import {makeAutoObservable} from "mobx";
import {TodoModel} from "../modules/todo/TodoModel";
import TodoService from "../modules/todo/TodoService";

export class TodoStore {
    todoModel: TodoModel[] = [];
    isLoading = false;
    todoService: TodoService;

    constructor() {
        makeAutoObservable(this);
        this.todoService = new TodoService();
    }

    getObjectFromService() {
        this.setIsLoading(true);
        this.todoService.getTodosAsync()
            .then(model => {
                this.setTodoModel(model);
            })
            .finally(() => setTimeout(() => this.setIsLoading(false), 5000))
    }

    actionHandleAddTodo = (newTodo: TodoModel) => {
        this.todoService.addTodo(this.todoModel, newTodo)
            .then(model => {
                this.setTodoModel(model)
            });
    }

    actionHandleRemoveTodo = async (id: string) => {
        let model = await this.todoService.removeTodo(this.todoModel, id);
        this.setTodoModel(model);
    }

    actionHandleMarkAsComplete = async (id: string) => {
        let model = await this.todoService.markAsCompleteTodo(this.todoModel, id);
        this.setTodoModel(model);
    }

    setIsLoading(value: boolean) {
        this.isLoading = value;
    };

    setTodoModel(value: TodoModel[]) {
        this.todoModel = value;
    };
}