import { SignupInput } from "@krunal-darekar/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useToast } from "./ui/use-toast"

export const Auth = ({action}: authProps) => {
    const anti = action === "Sign up"? "Login" : "Sign up"
    const headingContent = action === "Sign up"? "Create an account" : "Login to an account"
    const subHeadingContent = action === "Sign up" ? "Already have an account?" : "Don't have an account?"
    const redirect = action === "Sign up"? "/signin" : "/signup"
    const navigate = useNavigate()
    const { toast } = useToast()

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${action === "Sign up" ? "signup": "signin"}`, postInputs)
            const jwt = response.data.jwt
            localStorage.setItem("token", jwt)
            navigate('/')
            toast({
                title: action === "Sign up" ? "Signed up!" : "Logged in!",
                description: action == "Sign up" ? "Account created successfully" : "Account accessed successfully"
            })
        } catch(e: any) {
            console.log(e)
            if(e.response) {
                toast({
                    variant: "destructive",
                    title: "oh! something went wrong",
                    description: e.response.data.error
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "oh! something went wrong",
                    description: "error reaching server try again"
                })
            }
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center lg:min-w-72 p-4 md:p-32">
            <h1 className="text-3xl font-bold mb-1">{headingContent}</h1>
            <h3 className="text-sm text-slate-500 mb-4">{subHeadingContent} <Link className="underline" to={redirect}>{anti}</Link></h3>
            <form className="self-stretch flex flex-col ">
                {action === "Sign up" &&
                    <LabelledInput onChange={ (e) => {
                        setPostInputs( c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} label="Username" placeholder="Enter you username" type="text"/>
                }
                <LabelledInput onChange={(e) => {
                        setPostInputs( c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} label="Email" placeholder="example@email.com" type="email"/>
                <LabelledInput onChange={(e) => {
                        setPostInputs( c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} label="Password" placeholder="" type="password" />
                <button className="text-white bg-black text-sm rounded-md p-2 " onClick={handleClick}>{action}</button>
            </form>
        </div>
    )
}

interface authProps {
    action: string
}

const LabelledInput = ({label, placeholder, type, onChange}: labelledInputProps) => {

    return (
        <div className="flex flex-col text-sm font-semibold mb-3">
            <label htmlFor={label}>{label}</label>
            <input onChange={onChange} type={type} placeholder={placeholder} id={label} className="border rounded border-gray-300 mt-1 p-1.5 font-normal"/>
        </div>
    )
}

interface labelledInputProps {
    label: string,
    placeholder: string,
    type: "text" | "email" | "password",
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}