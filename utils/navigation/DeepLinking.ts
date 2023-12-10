import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';
import {linkingPrefix} from "../env";
import Navigation from "./Navigation";
import {getActionFromState, getStateFromPath} from '@react-navigation/native';

export class DeepLinking {
    static linking: LinkingOptions<{}> = {
        prefixes: [linkingPrefix],
        config: {
            screens: {
                ['DoneList']: {
                    path: 'screens/done-list'
                },
            },
        },
        getInitialURL() {
            return null;
        },
        subscribe(listener: (url: string) => void) {
            const linkingSubscription = Linking.addEventListener('url', ({url}) => {
                if (url === null) {
                    return;
                }
// Ручная навигация “по подписке”, если приложение уже запущено
                DeepLinking.handleNavigate(url); // <- Данный метод добавим далее
            });
            return () => {
                linkingSubscription.remove();
            };
        },
    };

    // Основная точка входа для навигации на нужный скрин
    static handleInitialNavigate = async (initialUrl: string | null) => {
        if (initialUrl === null) {
            return;
        }
// Навигация, если приложение закрыто
        await DeepLinking.handleNavigate(initialUrl, true); // <- Данный метод добавим далее
    };

    static handleNavigate = async (url: string, isInitialNavigate?: boolean) => {
        const action = DeepLinking.getActionFromState(DeepLinking.linking.config, url); // <- Будет далее
        switch (action?.type) {
            case 'NAVIGATE':
                const {name, params} = action.payload;
                if (name && params) {
                    if (isInitialNavigate) {
                        Navigation.replace(name, params); // наш кастомный навигатор
                        return;
                    }
                    Navigation.navigate(name, params); // наш кастомный навигатор
                }
                return;
        }
    };

    static getPathWithoutPrefix = (url: string) => {
        let path = '';
        DeepLinking.linking.prefixes.forEach(prefix => {
            if (url.indexOf(prefix) > -1) {
                path = url.replace(prefix, '');
                return;
            }
        });
        return path;
    };
    static getActionFromState = (config: any, url: string) => {
        const path = DeepLinking.getPathWithoutPrefix(url);
        const state = getStateFromPath(path, config);
        if (!state) {
            return;
        }
        return getActionFromState(state, config);
    };
}
