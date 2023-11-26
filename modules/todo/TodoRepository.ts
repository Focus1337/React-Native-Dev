import 'react-native-get-random-values'
import {RemoteTodoModel} from "./RemoteTodoModel";
import axios from "../../utils/clients/axios";

export default class TodoRepository {

    async getAllAsync(): Promise<RemoteTodoModel[]> {
        let value = await axios.get<RemoteTodoModel[]>('/todos?_start=0&_limit=30');
        return value.data;
    }
}
