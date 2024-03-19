import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { generateHTML } from "@tiptap/react"
import { extensions } from "./Tiptap"
import parse from 'html-react-parser';

interface content {
    content: Array<any>,
    type: "doc",
}

interface BlogCardProps {
    authorName: string,
    content: content,
    publishedDate: string
    id: string
}

const BlogCard = ({
    authorName,
    content,
    publishedDate,
    id,
}:BlogCardProps) => {
    const shorterContent = content
    const secondElement = content.content[1]
    secondElement.content[0].text = secondElement.content[0].text.length > 150 ? secondElement.content[0].text.slice(0 , 150) + "..." : secondElement.content[0].text
    shorterContent.content = [content.content[0], secondElement]
    console.log(shorterContent)
    
    const contentHtml = generateHTML(content, extensions)

    return <Link to={`/blog/${id}`} className="w-full lg:w-1/2 mx-2 md:mx-10 overflow-hidden">
    <div className="flex flex-col w-full border-b border-slate-300 p-4">
        <div className="flex items-center mb-2">
            <Avatar name={authorName} size="small"/>
            <div className="mx-2">{authorName}</div>
            <div className="text-xs text-gray-400"> published on {publishedDate}</div>
        </div>
        <div className="tiptap blogs">{parse(contentHtml)}</div>
    </div>
    </Link>
}

export default BlogCard