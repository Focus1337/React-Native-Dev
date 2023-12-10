import LogService from "./LogService";
import {LogModel} from "./LogModel";
import {v4 as uuidv4} from "uuid";

export class LogStore {
    private logService: LogService;
    logs: string[] = [];

    constructor() {
        this.logService = new LogService();
    }

    actionHandleUpdateLogs = async () => {
        this.setLogs((await this.logService.getLogsAsync()).map((log) => `[${log.dateTime}] [${log.id}] [${log.action}] [${log.item}]`));
    };

    actionHandleAddLog = async (action: string, item: string) => {
        let localLogs = await this.logService.getLogsAsync();
        let newLogs = [...localLogs, new LogModel(uuidv4(), (new Date()).toLocaleTimeString(), action, item)];
        await this.logService.setLogsAsync(newLogs);
        await this.actionHandleUpdateLogs();
    };

    actionHandleRemoveLogs = async () => {
        await this.logService.removeLogsAsync();
        await this.actionHandleUpdateLogs();
    };

    private setLogs(value: string[]) {
        this.logs = value;
    };
}
