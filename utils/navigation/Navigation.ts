import React from "react";

export default class Navigation {
    static navigationRef = React.createRef<any>();
// Навигация на экран
    static navigate = (routeName: string, params?: any) => {
        setTimeout(() => this.navigationRef.current?.navigate(routeName, params), 0);
    };
// Сброс стека навигации и переход на дефолтный первый экран
    static replace = (routeName: string, params?: any) => {
        setTimeout(
            () =>
                this.navigationRef.current?.reset({
                    index: 0,
                    routes: [{name: routeName, params: params}],
                }),
            0,
        );
    };
}