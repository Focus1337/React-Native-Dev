import LangService from "./LangService";
import {LangType} from "./LangType";

export class LangStore {
    private langService: LangService;
    lang: LangType = LangType.RU;

    constructor() {
        this.langService = new LangService();
    }

    changeLang = async (lang: LangType) => {
        await this.langService.changeLang(lang);
        this.setLang(lang);
    }

    getLang = async () => {
        let result = await this.langService.getLang();
        this.setLang(result);
    }

    private setLang = (value: LangType) => {
        this.lang = value;
    }
}
