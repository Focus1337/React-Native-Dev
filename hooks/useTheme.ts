import {useContext, useMemo} from "react";
import {ThemeContext} from "../modules/theme/ThemeProvider";
import {IColors} from "../modules/theme/IColors";
import {ColorsKeys} from "../modules/theme/ColorsKeys";
import {IThemeContext} from "../modules/theme/IThemeContext";
import {Colors} from "../styles/Colors";

export const useTheme = (): IThemeContext & { Colors: IColors; } => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    const colors = useMemo<IColors>(() => {
        const result = {};
        const keys = Object.keys(Colors) as Array<ColorsKeys>;
        for (let i = 0; i < keys.length; i++) {
            const colorObject = Colors[keys[i]];
            if (context.theme in colorObject) {
                Object.assign(result, {[keys[i]]: colorObject[context.theme]});
            }
        }
        return result as IColors;
    }, [context.theme]);
    return {Colors: colors, ...context};
};