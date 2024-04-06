import { Link, useLocation, useNavigate } from "react-router-dom"
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
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useToast } from "./ui/use-toast"
import { Separator } from "./ui/separator"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  

const AppBar = () => {
    const location = useLocation()
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)
    const setIsSignedIn = useSetRecoilState(isSignedInAtom)
    const [userName, setUserName] = useState(user.name)
    const [userDescription, setUserDescription] = useState(user.description)
    const isSignedIn = useRecoilValue(isSignedInAtom)
    const { toast } = useToast()
    const navigate = useNavigate()

    const onSave = async() => {
        try{
            const response = await axios.put(`${BACKEND_URL}/api/v1/user/edit`, {
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
                    description: e.response.data.error,
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

    const handleLogOut = () => {
        setIsSignedIn(false)
        localStorage.removeItem('token')
        navigate('/signin')
    }
    
    return (
        <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-300">
            <Link className="text-2xl font-bold" to={'/blogs'}>
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
                {!isSignedIn && <Link to={"/signup"} className="flex items-center mr-4 bg-black text-white rounded-full py-1 px-4 hover:bg-gray-700">
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
                        <SheetClose className="bg-black text-white py-2 px-4 rounded-md hover:bg-slate-800" onClick={onSave}>
                            Save changes
                        </SheetClose>
                        </div>
                        <Separator className="my-2"/>
                        <SheetTitle>Settings</SheetTitle>
                        <button onClick={() => {navigate('/my')}} className="flex hover:text-slate-500 my-2 ml-[-4px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            Your blogs
                        </button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="flex hover:text-slate-500 my-2 ml-[-4px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                    Log out
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure about logging out?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogOut}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetContent>
                </Sheet>}
            </div>
        </div>
    )
}

export default AppBar