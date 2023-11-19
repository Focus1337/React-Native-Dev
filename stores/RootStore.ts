import React from "react";
import {TodoStore} from "./TodoStore";
import {LogsStore} from "./LogsStore";

class RootStore {
    todoViewModel: TodoStore;
    logsStore: LogsStore;

    constructor() {
        this.todoViewModel = new TodoStore();
        this.logsStore = new LogsStore();
    }
}

export const rootStore = new RootStore();
export const storesContext = React.createContext(rootStore);
