import React from "react";
import {TodoStore} from "./TodoStore";
import {LogsStore} from "./LogsStore";

class RootStore {
    todoStore: TodoStore;
    logsStore: LogsStore;

    constructor() {
        this.todoStore = new TodoStore();
        this.logsStore = new LogsStore();
    }
}

export const rootStore = new RootStore();
export const storesContext = React.createContext(rootStore);