import LogRepository from "./LogRepository";
import {LogModel} from "./LogModel";

export default class LogService {
    private readonly logRepository: LogRepository;

    constructor() {
        this.logRepository = new LogRepository("logs");
    }

    getLogsAsync = async (): Promise<LogModel[]> => {
        try {
            let result = await this.logRepository.getLogs();
            if (result === null)
                return [];

            let logs: LogModel[] = JSON.parse(result);
            if (logs === undefined)
                return [];

            return logs;

        } catch (e) {
            console.log(e);
        }
    };

    setLogsAsync = async (logs: LogModel[]) =>
        await this.logRepository.setLogs(JSON.stringify(logs));

    removeLogsAsync = async () =>
        await this.logRepository.removeAllLogs();
}
