import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { generateHTML } from "@tiptap/react"
import { extensions } from "./Tiptap"
import parse from 'html-react-parser';
import moment from "moment";
import { image } from "@/hooks";

interface content {
    content: Array<any>,
    type: "doc",
}

interface BlogCardProps {
    authorName: string,
    content: content,
    image: image,
    publishedDate: string,
    id: string
}

const BlogCard = ({
    authorName,
    content,
    image,
    publishedDate,
    id,
}:BlogCardProps) => {
    const relativeTime = moment(new Date(publishedDate)).fromNow()
    const shorterContent = content
    let secondElement
    if(content.content[1]) {
        secondElement = content.content[1] 
        secondElement.content[0].text = secondElement.content[0].text.length > 150 ? secondElement.content[0].text.slice(0 , 150) + "..." : secondElement.content[0].text
        shorterContent.content = [content.content[0], secondElement]
    }
    
    const contentHtml = generateHTML(shorterContent, extensions)

    return <Link to={`/blog/${id}`} className="w-full lg:w-3/5 mx-2 md:mx-10 overflow-hidden">
    <div className="flex flex-col w-full border-b border-slate-300 p-4">
        <div className="flex items-center mb-2">
            <Avatar name={authorName} size="small"/>
            <div className="mx-2">{authorName}</div>
            <div className="text-xs text-gray-400"> published {relativeTime}</div>
        </div>
        <div className="md:flex">
            <div className="tiptap blogs md:w-8/12 mb-2 md:mb-0">{parse(contentHtml)}</div>
            <div className="md:ml-auto md:max-w-36 flex justify-center items-center">
                <img src={image.imageUrl} alt="" />
            </div>
        </div>
    </div>
    </Link>
}

export default BlogCard