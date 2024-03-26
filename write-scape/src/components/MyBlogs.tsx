import { Blog } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlogCard from "./BlogCard";


const MyBlogs = ({blogs}: {blogs: Blog[]}) => {
    return (
        <div className="mt-5 md:mt-10">
            <Tabs defaultValue="published" className="">
                <div className="lg:flex lg:justify-center">
                <TabsList className="flex mx-2 md:mx-10 lg:w-1/2">
                    <TabsTrigger value="published" className="w-full">Published</TabsTrigger>
                    <TabsTrigger value="drafted" className="w-full">Drafted</TabsTrigger>
                </TabsList>
                </div>
                <TabsContent value="published">
                    <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                        {
                            blogs.map( (blog) => 
                                <BlogCard id={blog.id} key={blog.id} authorName={blog.author.name || "Anonymous"} content={blog.content} publishedDate={blog.createdAt}/>
                            )
                        }
                    </div>
                </TabsContent>
                <TabsContent value="drafted">
                    <div className="flex flex-col items-center mx-2 md:mx-10 mt-2">
                        {
                            blogs.map( (blog) => 
                                <BlogCard id={blog.id} key={blog.id} authorName={blog.author.name || "Anonymous"} content={blog.content} publishedDate={blog.createdAt}/>
                            )
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
};

export default MyBlogs;
