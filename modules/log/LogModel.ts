export class LogModel {
    id: string;
    dateTime: string;
    action: string;
    item: string;

    constructor(id: string, dateTime: string, action: string, item: string) {
        this.id = id;
        this.dateTime = dateTime;
        this.action = action;
        this.item = item;
    }
}
