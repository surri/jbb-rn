import { atom } from 'recoil'

export const userState = atom({
    key: 'userState',
    default: [],
})

export const loginState = atom({
    key: 'loginState',
    default: false,
})