import React, {createContext, useEffect, useState} from "react";
import {Appearance, NativeEventSubscription} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IThemeContext} from "./IThemeContext";
import {ThemeType, ThemeTypes} from "./ThemeTypes";

const THEME_KEY = '@THEME'; // для хранения в локальном хранилище
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface IProps {
    children: JSX.Element;
}

export const ThemeProvider: React.FC<IProps> = ({children}) => {
    const [theme, setTheme] = useState<ThemeType>(ThemeTypes.LIGHT);
    const [selectTheme, setSelectTheme] = useState<ThemeTypes>(ThemeTypes.LIGHT);
    useEffect(() => {
        (async () => {
            const savedTheme = (await AsyncStorage.getItem(THEME_KEY)) as ThemeTypes;
            if (!savedTheme) {
                return;
            }
            await changeTheme(savedTheme);
        })();
    }, []);

    useEffect(() => {
        let listener: NativeEventSubscription;
        if (selectTheme === ThemeTypes.SYSTEM) {
            listener = Appearance.addChangeListener(({colorScheme}) => {
                if (colorScheme) {
                    setTheme(colorScheme as ThemeType);
                }
            });
        }
        return () => {
            if (listener) {
                listener.remove();
            }
        };
    }, [selectTheme]);
    const changeTheme = async (newTheme: ThemeTypes) => {
        setSelectTheme(newTheme);
        await AsyncStorage.setItem(THEME_KEY, newTheme);
        if (newTheme === ThemeTypes.SYSTEM) {
            const colorScheme = Appearance.getColorScheme() as ThemeType;
            if (colorScheme) {
                setTheme(colorScheme);
            }
        } else {
            setTheme(newTheme);
        }
    };
    return (
        <ThemeContext.Provider
            value={{
                theme,
                selectTheme,
                changeTheme,
            }}>
            {children}
        </ThemeContext.Provider>
    );
}