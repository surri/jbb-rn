import { atom, AtomEffect, DefaultValue } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistAtom: AtomEffect<any> = ({ node, setSelf, onSet }) => {
    setSelf(
        AsyncStorage.getItem(node.key).then((savedValue) =>
            savedValue != null ? JSON.parse(savedValue) : new DefaultValue(),
        ),
    )

    onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
            AsyncStorage.removeItem(node.key)
        } else {
            AsyncStorage.setItem(node.key, JSON.stringify(newValue))
        }
    })
}

export const userState = atom({
    key: 'userState',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

export const loginState = atom({
    key: 'loginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const isDarkState = atom({
    key: 'isDarkState',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const selectedSportsState = atom({
    key: 'selectedSportsState',
    default: null,
    effects_UNSTABLE: [persistAtom],
})
