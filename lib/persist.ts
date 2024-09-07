import { defaultCharacters } from "./defaultCharacters";

export function mergePreferences(data: any) {
    if (typeof localStorage !== 'undefined') {
        let appDataString = localStorage.getItem("dnd_app_data");
        if (appDataString) {
            let appData = JSON.parse(appDataString);
            appData = { ...appData, ...data };
            localStorage.setItem(
                "dnd_app_data",
                JSON.stringify(appData)
            );
        } else {
            localStorage.setItem(
                "dnd_app_data",
                JSON.stringify(data)
            );
        }
    }
}

export function loadPreferences() {
    return defaultCharacters;
    // let ls: any = {};
    // if (typeof localStorage !== 'undefined') {
    //     try {
    //         let appData = JSON.parse(localStorage.getItem("dnd_app_data") || "");
    //         if (!appData) {
    //             mergePreferences(defaultCharacters);
    //             return defaultCharacters;
    //         }
    //         return appData;
    //     } catch (e) {
    //         mergePreferences(defaultCharacters);
    //         return defaultCharacters;
    //     }
    // }
    // return null;
}