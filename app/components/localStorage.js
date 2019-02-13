import {AsyncStorage} from 'react-native';

export const loadState = async(name) => {
    try {
        const state = await AsyncStorage.getItem(`${name}`);
        if(state === null) {
            return state;
        }
        return JSON.parse(state)
    } catch (er) {
        return undefined;
    }
};

export const saveState = (name,state) => {
    try {
        const state_json = JSON.stringify(state);
        AsyncStorage.setItem(`${name}`, state_json);
    } catch (er){}
}

export const removeState = (name) => {
    try {
        AsyncStorage.removeItem(`${name}`)
    } catch (er){}
}