import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog"
import AppBar from "../components/AppBar"
import { SingleBlogSkeleton } from "../components/skeleton"

export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })

    if(loading) {
        return <div>
            <AppBar/>
            <SingleBlogSkeleton/>
        </div>
    } else if(blog) {
        return (
            <div>
                <AppBar/>
                <FullBlog blog={blog}/>
            </div>
        )
    } else {
        return (
            <div>
                no blog
            </div>
        )
    }
}