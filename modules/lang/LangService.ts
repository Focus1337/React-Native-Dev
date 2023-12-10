import {Localization} from './LangAdapter';
import LangLocalRepository from './LangLocalRepository';
import {LangType} from './LangType';

export default class LangService {
    langLocal: LangLocalRepository;

    constructor() {
        this.langLocal = new LangLocalRepository();
    }

    changeLang = async (lang: LangType) => {
        await this.langLocal.set(lang);
        if (lang) {
            await Localization.changeLanguage(lang); // метод “из коробки” i18next
        }
    };
    getLang = async () => {
        return await this.langLocal.get();
    };
}
