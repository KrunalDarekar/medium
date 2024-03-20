import { Link, useLocation } from "react-router-dom"
import Avatar from "./Avatar"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { isSignedInAtom, userAtom } from "../state/atoms/atoms"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useToast } from "./ui/use-toast"
  

const AppBar = () => {
    const location = useLocation()
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)
    const [userName, setUserName] = useState(user.name)
    const [userDescription, setUserDescription] = useState(user.description)
    const isSignedIn = useRecoilValue(isSignedInAtom)
    const { toast } = useToast()

    const onSave = async() => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/edit`, {
                name: userName,
                description: userDescription
              },{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.message) {
                toast({
                    title: "success",
                    description: response.data.message,
                })
                setUser((user) => {return {...user, name:userName, description:userDescription}})
            }
        } catch(e: any) {
            if(e.response) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: e.response.error,
                  })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Error reaching the server",
                })
            }
        }
    }
    
    return (
        <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-300">
            <Link className="text-xl font-semibold" to={'/blogs'}>
                WriteScape
            </Link>
            <div className="flex">
                {isSignedIn && location.pathname != "/create" && <Link to={'/create'} className="flex items-center mr-4 hover:text-gray-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
                    <div className="ml-1">New</div>
                </Link>}
                {!isSignedIn && <Link to={"/signin"} className="self-center mr-4 hover:text-gray-500 hidden md:block">
                    Log in
                </Link>}
                {!isSignedIn && <Link to={"/signup"} className="flex items-center mr-4 bg-black text-white rounded-full px-4 hover:bg-gray-700">
                    Sign up
                </Link>}
                {isSignedIn && <Sheet>
                    <SheetTrigger className="flex" onClick={() => {
                        setUserName(user.name)
                        setUserDescription(user.description)
                    }}>
                        <Avatar name={user.name} size="big" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input id="name" value={userName} onChange={(e) => {setUserName(e.target.value)}} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                Description
                                </Label>
                                <Textarea id="description" value={userDescription} onChange={(e) => {setUserDescription(e.target.value)}} className="col-span-3 resize-none" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                        <SheetClose className="bg-black text-white py-2 px-4 rounded-md" onClick={onSave}>
                            Save changes
                        </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>}
            </div>
        </div>
    )
}

export default AppBar