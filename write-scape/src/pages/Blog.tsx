import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog"
import AppBar from "../components/AppBar"

export const Blog = () => {
    const {id} = useParams()
    console.log(id)
    const {loading, blog} = useBlog({
        id: id || ""
    })

    console.log(blog)

    if(loading) {
        return <div>
            <AppBar/>
            <div>loading...</div>
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