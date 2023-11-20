import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {Platform} from "react-native";
import {API_URL} from "../env";

// Я не согласен с подобным решением. Лучше использовать обычный инстанс, вместо подобного. Такое решение, возможно,
// ещё имеет небольшое право жить в JS, но в TS это недопустимо, особенно со строгой типизацией. Да я и не вижу смысла в том,
// чтобы заменять axios на другую подобную библу, ну или тот же fetch. А дженерики и <T extends {}>, (config: any) - вообще умора))
// Т.е. если я не захочу использовать any, мне придется выделить несколько типов для каждого вида запроса.
// Просто использую в качестве ДЗ, но в след. ДЗ я это снесу.
export default class AxiosClient {
    static readonly SUCCESS_STATUSES = [200, 201];
    static readonly SERVER_ERROR = 500;
    private api: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.api = axios.create(config);
        this.api.defaults.baseURL = this.getDefaultBaseUrl();
        this.api.defaults.headers.common['App-Platform'] = Platform.OS;
        this.api.defaults.headers.common['Content-Type'] = 'application/json';
    }

    getDefaultBaseUrl = () => API_URL;

    get = <T extends {}>(config: { url: string, config?: AxiosRequestConfig<any> }) =>
        this.api.get<T>(config.url, config.config);
    post = <T extends {}>(config: { url: string, data: any, config?: AxiosRequestConfig<any> }) =>
        this.api.post<T>(config.url, config.data, config.config);
    put = <T extends {}>(config: { url: string, data: any, config?: AxiosRequestConfig<any> }) =>
        this.api.put<T>(config.url, config.data, config.config);
    delete = <T extends {}>(config: { url: string, config?: AxiosRequestConfig<any> }) =>
        this.api.delete<T>(config.url, config.config);
}
