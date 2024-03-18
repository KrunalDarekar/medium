import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { generateHTML } from "@tiptap/react"
import { extensions } from "./Tiptap"
import parse from 'html-react-parser';

interface BlogCardProps {
    authorName: string,
    content: JSON,
    publishedDate: string
    id: string
}

const BlogCard = ({
    authorName,
    content,
    publishedDate,
    id,
}:BlogCardProps) => {
    const contentHtml = generateHTML(content, extensions)

    return <Link to={`/blog/${id}`} className="w-full lg:w-2/4 mx-2 md:mx-10">
    <div className="flex flex-col p-4 border-b border-slate-300 w-full">
        <div className="flex items-center mb-2">
            <Avatar name={authorName} size="small"/>
            <div className="mx-2">{authorName}</div>
            <div className="text-xs text-gray-400"> published on {publishedDate}</div>
        </div>
        <div className="tiptap">{parse(contentHtml)}</div>
    </div>
    </Link>
}

export default BlogCard