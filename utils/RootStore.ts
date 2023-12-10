import React from "react";
import {TodoStore} from "../modules/todo/TodoStore";
import {LogStore} from "../modules/log/LogStore";
import {LangStore} from "../modules/lang/LangStore";

class RootStore {
    todoViewModel: TodoStore;
    logsStore: LogStore;
    langStore: LangStore;

    constructor() {
        this.todoViewModel = new TodoStore();
        this.logsStore = new LogStore();
        this.langStore = new LangStore();
    }
}

export const rootStore = new RootStore();
export const storesContext = React.createContext(rootStore);
