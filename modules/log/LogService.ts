import LogRepository from "./LogRepository";
import {LogModel} from "./LogModel";

export default class LogService {
    private readonly logRepository: LogRepository;

    constructor() {
        this.logRepository = new LogRepository("logs");
    }

    getLogsAsync = async (): Promise<LogModel[]> => {
        let logs: LogModel[] = [];
        try {
            let result = await this.logRepository.getLogs();
            if (result === null)
                return [];

            logs = JSON.parse(result);
            if (logs === undefined)
                return [];
            return logs;
        } catch (e) {
            console.log(e);
        }

        return logs;
    };

    setLogsAsync = async (logs: LogModel[]) =>
        await this.logRepository.setLogs(JSON.stringify(logs));

    removeLogsAsync = async () =>
        await this.logRepository.removeAllLogs();
}
