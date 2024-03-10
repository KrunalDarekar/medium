import { useSetRecoilState } from "recoil";
import { isSignedInAtom, userAtom } from "../state/atoms/atoms";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Landing = () => {
    const setUser = useSetRecoilState(userAtom);
    const setIsSignedIn = useSetRecoilState(isSignedInAtom);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect( () => {
        if(token) {
            axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }).then( res => {
                setUser(res.data)
                setIsSignedIn(true)
            })
        }
        navigate('/blogs')
    },[])

    return (
        <div>landing</div>
    )
}