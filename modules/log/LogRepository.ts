import LocalClient from "../../utils/clients/LocalClient";

export default class LogRepository {
    private readonly localClient: LocalClient;
    private readonly key: string;

    constructor(key: string) {
        this.localClient = new LocalClient();
        this.key = key;
    }

    getLogs = async () => {
        return await this.localClient.getAsync(this.key);
    };

    setLogs = async (logsInJson: string) =>
        await this.localClient.setAsync(this.key, logsInJson);

    removeAllLogs = async () =>
        await this.localClient.removeAllAsync(this.key);
}