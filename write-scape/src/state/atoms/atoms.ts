import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtomkey',
    default: {
        name: "Anonymous",
        emai: null,
        description: null
    }
})

export const isSignedInAtom = atom({
    key: 'isSignedInAtomkey',
    default: false
})