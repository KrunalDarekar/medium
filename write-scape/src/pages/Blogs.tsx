import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { BlogsSkeleton } from "../components/skeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {blogs, loading} = useBlogs()

    if(loading) {
        return (
            <>
                <AppBar/>
                <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                    <BlogsSkeleton />
                </div>
            </>
        )
    }

    return (
        <>
            <AppBar/>
            <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                {
                    blogs.map( (blog) => 
                        <BlogCard id={blog.id} key={blog.id} authorName={blog.author.name || "Anonymous"} content={blog.content} title={blog.title} publishedDate="04/04/2024"/>
                    )
                }
            </div>
        </>
    )
}