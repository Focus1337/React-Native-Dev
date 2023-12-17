import {ThemeType, ThemeTypes} from "./ThemeTypes";

export interface IThemeContext {
    theme: ThemeType;
    selectTheme: ThemeTypes;
    changeTheme: (value: ThemeTypes) => void;
}