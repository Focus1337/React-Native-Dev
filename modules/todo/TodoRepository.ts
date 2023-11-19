import axios from "../../utils/axios";
import {TodoModel} from "./TodoModel";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
import {IRepository} from "../../repositories/IRepository";
import {ExternalTodoModel} from "./ExternalTodoModel";

export default class TodoRepository implements IRepository<TodoModel> {
    async getAllAsync(): Promise<TodoModel[]> {
        let value = await axios.get<ExternalTodoModel[]>('/todos?_start=0&_limit=30');
        let externalModel = value.data;

        return externalModel.map((model: ExternalTodoModel) => ({
            id: uuidv4(),
            title: model.title,
            completed: model.completed
        }));
    }
}
