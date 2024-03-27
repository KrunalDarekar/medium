import { generateHTML } from "@tiptap/react"
import { Blog } from "../hooks"
import Avatar from "./Avatar"
import { extensions } from "./Tiptap"
import parse from 'html-react-parser'
import moment from 'moment';
import { useRecoilValue } from "recoil"
import { userAtom } from "@/state/atoms/atoms"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useToast } from "./ui/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


const FullBlog = ({blog}: { blog: Blog}) => {

    const user = useRecoilValue(userAtom)
    
    const createdAtDate = moment(new Date(blog.createdAt)).format('MMMM Do YYYY, h:mm a')
    const contentHtml = generateHTML(blog.content , extensions)

    const navigate = useNavigate()
    const { toast } = useToast()

    const handleEdit =  () => {
        navigate(`/edit/${blog.id}`)
    }

    const handleDelete = async () => {
        try{
            const response = await axios.delete( `${BACKEND_URL}/api/v1/blog/${blog.id}` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            toast({
                variant: "default",
                title: "Deleted!",
                description: "blog deleted successfully."
            })
            navigate('/my')
        } catch(e) {
            toast({
                variant: "destructive",
                title: "uh oh! something went wrong",
                description: "error while deleting the blog"
            })
        }
    }

    return <div className="flex justify-center max-w-screen-lg mx-auto mt-5 md:mt-10">
        <div className="grid md:grid-cols-12 w-full px-10">
            <div className="md:col-span-8 tiptap">
                <div>{parse(contentHtml)}</div>
                <div className="text-slate-400 text-sm mt-5">{`published on ${createdAtDate}`}</div>
                {user.id === blog.authorId && 
                <div className="flex gap-2 mt-5">
                    <Button onClick={handleEdit} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Update
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                blog.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                }
            </div>
            <div className="md:col-span-4 mt-3 md:mt-0 md:ml-3 font-medium">
                Author
                <div className="flex mt-1 md:mt-3">
                    <div className="self-center mr-3">
                        <Avatar name={blog.author.name} size="small"/>
                    </div>
                    <div>
                        <div className="text-xl font-bold">{capitalizeFirstLetter(blog.author.name)}</div>
                        <div className="text-slate-500 font-normal">{blog.author.description || "no description"}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default FullBlog