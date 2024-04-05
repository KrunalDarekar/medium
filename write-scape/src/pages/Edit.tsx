import { useParams } from "react-router-dom"
import AppBar from "../components/AppBar"
import { useBlog } from "@/hooks"
import EditTiptap from "@/components/EditTiptap"
import { useRecoilValue } from "recoil"
import { userAtom } from "@/state/atoms/atoms"
import { EditorSkeleton } from "@/components/skeleton"

const Edit = () => {
    const {id} = useParams()
    const user = useRecoilValue(userAtom)
    const {loading, blog, error} = useBlog({
        id: id || ""
    })
    if(loading) {
        return <div>
            <AppBar/>
            <EditorSkeleton/>
        </div>
    }

    if(error || !blog) {
        return <div className="w-full h-screen">
            <AppBar/>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="text-9xl mt-52">404</div>
                <div>{error}</div>
            </div>
        </div>
    }

    if(user.id != blog.authorId) {
        return <div className="w-full h-screen">
            <AppBar/>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="text-9xl mt-52">403</div>
                <div>you cannot edit this blog</div>
            </div>
        </div>
    }

    return (
        <div>
            <AppBar />
            <EditTiptap content={blog.content} id={id || ""} image={blog.image}/>
        </div>
    )
}

export default Edit;
