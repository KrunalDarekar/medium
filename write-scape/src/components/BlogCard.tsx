import { Link } from "react-router-dom"
import Avatar from "./Avatar"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string
}

const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
}:BlogCardProps) => {
    return <Link to={`/blog/${id}`} className="w-full lg:w-2/4 m-2 md:mx-10">
    <div className="flex flex-col p-4 border-b border-slate-300 w-full">
        <div className="flex items-center mb-2">
            <Avatar name={authorName} size="small"/>
            <div className="mx-2">{authorName}</div>
            <div className="text-xs text-gray-400"> published on {publishedDate}</div>
        </div>
        <div className="text-xl font-bold">{title}</div>
        <div>{content.length > 100 ? content.slice(0, 150) + "..." : content}</div>
    </div>
    </Link>
}

export default BlogCard