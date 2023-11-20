import 'react-native-get-random-values'
import {RemoteTodoModel} from "./RemoteTodoModel";
import AxiosClient from "../../utils/clients/AxiosClient";

export default class TodoRepository {
    private readonly apiClient: AxiosClient;

    constructor() {
        this.apiClient = new AxiosClient(null);
    }

    async getAllAsync(): Promise<RemoteTodoModel[]> {
        let value = await this.apiClient.get<RemoteTodoModel[]>({url: '/todos?_start=0&_limit=30'});
        return value.data;
    }
}
