import AppBar from "@/components/AppBar";
import MyBlogs from "@/components/MyBlogs";
import { useMyBlogs } from "@/hooks"
import { Link } from "react-router-dom";

const My = () => {
    const {blogs, loading} = useMyBlogs()

    if(loading) {
        return <div>
            loading
        </div>
    }

    if(!blogs) {
        return <div className="w-full h-screen">
            <AppBar/>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="text-9xl mt-52">404</div>
                <div><Link to={'/signin'} className="underline">Login</Link> to view this page</div>
            </div>
        </div>
    }

    return (
        <div>
            <AppBar/>
            <MyBlogs blogs={blogs}/>
        </div>
    )
};

export default My;


