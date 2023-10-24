import React from "react";
import {TodoViewModel} from "./TodoViewModel";
import {LogsStore} from "./LogsStore";

class RootStore {
    todoViewModel: TodoViewModel;
    logsStore: LogsStore;

    constructor() {
        this.todoViewModel = new TodoViewModel();
        this.logsStore = new LogsStore();
    }
}

export const rootStore = new RootStore();
export const storesContext = React.createContext(rootStore);