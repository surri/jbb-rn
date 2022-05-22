import { atom } from 'recoil'

export const userState = atom({
    key: 'userState',
    default: [],
})

export const loginState = atom({
    key: 'loginState',
    default: false,
})

export const isDarkState = atom({
    key: 'isDarkState',
    default: false,
})

export const selectedSportsState = atom({
    key: 'selectedSportsState',
    default: null,
})