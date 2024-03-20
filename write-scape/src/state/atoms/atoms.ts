import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtomkey',
    default: {
        name: "Anonymous",
        email: null,
        description: ""
    }
})

export const isSignedInAtom = atom({
    key: 'isSignedInAtomkey',
    default: false
})