import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { BlogsSkeleton } from "../components/skeleton"
import { useBlogs } from "../hooks"
import { useRecoilValue } from "recoil"
import { isSignedInAtom } from "../state/atoms/atoms"
import SigninFlag from "../components/SinginFlag"

export const Blogs = () => {
    const {blogs, loading} = useBlogs()
    const isSignedIn = useRecoilValue(isSignedInAtom)

    if(loading) {
        return (
            <>
                <AppBar/>
                {!isSignedIn && <SigninFlag/>}
                <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                    <BlogsSkeleton />
                </div>
            </>
        )
    } 

    return (
        <>
            <AppBar/>
            {!isSignedIn && <SigninFlag/>}
            <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                {
                    blogs.map( (blog) => 
                        <BlogCard id={blog.id} key={blog.id} authorName={blog.author.name || "Anonymous"} content={blog.content} publishedDate={blog.createdAt}/>
                    )
                }
            </div>
        </>
    )
}