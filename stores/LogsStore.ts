export class LogsStore {
    logs: string[] = [];

    actionAddLog = (item: string) => {
        this.logs.push(`[${(new Date()).toLocaleTimeString()}] ${item}`);
    };
}