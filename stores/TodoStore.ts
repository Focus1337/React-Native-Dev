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

    actionHandleGetTodo() {
        this.setIsLoading(true);
        this.todoService.getTodosAsync()
            .then(model => {
                this.setTodoModel(model);
            })
            .finally(() => setTimeout(() => this.setIsLoading(false), 0))
    }

    actionHandleAddTodo = (newTodo: TodoModel) => {
        let model = this.todoService.addTodo(this.todoModel, newTodo);
        this.setTodoModel(model);
    }

    actionHandleRemoveTodo = (id: string) => {
        let model = this.todoService.removeTodo(this.todoModel, id);
        this.setTodoModel(model);
    }

    actionHandleMarkAsComplete = (id: string) => {
        let model = this.todoService.markAsCompleteTodo(this.todoModel, id);
        this.setTodoModel(model);
    }

    setIsLoading(value: boolean) {
        this.isLoading = value;
    };

    setTodoModel(value: TodoModel[]) {
        this.todoModel = value;
    };
}
