import { generateHTML } from "@tiptap/react"
import { Blog } from "../hooks"
import Avatar from "./Avatar"
import { extensions } from "./Tiptap"
import parse from 'html-react-parser';


const FullBlog = ({blog}: { blog: Blog}) => {
    const contentHtml = generateHTML(blog.content , extensions)
    return <div className="flex justify-center max-w-screen-lg mx-auto mt-5 md:mt-10">
        <div className="grid md:grid-cols-12 w-full px-10">
            <div className="md:col-span-8 tiptap">
                {parse(contentHtml)}
            </div>
            <div className="md:col-span-4 mt-3 md:mt-0 md:ml-3 font-medium">
                Author
                <div className="flex mt-1 md:mt-3">
                    <div className="self-center mr-3">
                        <Avatar name={blog.author.name} size="small"/>
                    </div>
                    <div>
                        <div className="text-xl font-bold">{capitalizeFirstLetter(blog.author.name)}</div>
                        <div className="text-slate-500 font-normal">Master of mirth, purveyor of puns an the funniest person in the kingdom</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default FullBlog