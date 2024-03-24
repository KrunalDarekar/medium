import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog"
import AppBar from "../components/AppBar"
import { SingleBlogSkeleton } from "../components/skeleton"
import { useRecoilValue } from "recoil"
import { isSignedInAtom } from "../state/atoms/atoms"
import SigninFlag from "../components/SinginFlag"

export const Blog = () => {
    const {id} = useParams()
    const {loading, blog, error} = useBlog({
        id: id || ""
    })
    const isSignedIn = useRecoilValue(isSignedInAtom)

    if(loading) {
        return <div>
            <AppBar/>
            {!isSignedIn && <SigninFlag/>}
            <SingleBlogSkeleton/>
        </div>
    } else if(blog) {
        return (
            <div>
                <AppBar/>
                {!isSignedIn && <SigninFlag/>}
                <FullBlog blog={blog}/>
            </div>
        )
    } else {
        return <div className="w-full h-screen">
            <AppBar/>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="text-9xl mt-52">404</div>
                <div>{error}</div>
            </div>
        </div>
    }
}