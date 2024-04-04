export const BlogsSkeleton = () => {
    return <>
        <div className="w-full lg:w-2/4 mx-2 md:mx-10">
        <div className="animate-pulse flex flex-col p-4 border-b border-slate-300 w-full">
            <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                <div className="w-1/3 bg-gray-300 rounded-lg h-5"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4 mb-1"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4"></div>
        </div>
        </div>
        <div className="w-full lg:w-2/4 mx-2 md:mx-10">
        <div className="animate-pulse flex flex-col p-4 border-b border-slate-300 w-full">
            <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                <div className="w-1/3 bg-gray-300 rounded-lg h-5"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4 mb-1"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4"></div>
        </div>
        </div>
        <div className="w-full lg:w-2/4 mx-2 md:mx-10">
        <div className="animate-pulse flex flex-col p-4 border-b border-slate-300 w-full">
            <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                <div className="w-1/3 bg-gray-300 rounded-lg h-5"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4 mb-1"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4"></div>
        </div>
        </div>
        <div className="w-full lg:w-2/4 mx-2 md:mx-10">
        <div className="animate-pulse flex flex-col p-4 border-b border-slate-300 w-full">
            <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                <div className="w-1/3 bg-gray-300 rounded-lg h-5"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4 mb-1"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4"></div>
        </div>
        </div>
        <div className="w-full lg:w-2/4 mx-2 md:mx-10">
        <div className="animate-pulse flex flex-col p-4 border-b border-slate-300 w-full">
            <div className="flex items-center mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                <div className="w-1/3 bg-gray-300 rounded-lg h-5"></div>
            </div>
            <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4 mb-1"></div>
            <div className="w-full bg-gray-300 rounded-lg h-4"></div>
        </div>
        </div>
    </>
}

export const SingleBlogSkeleton = () => {

    return(
        <div className="flex justify-center max-w-screen-lg mx-auto mt-5 md:mt-10">
        <div className="animate-pulse grid md:grid-cols-12 w-full px-10">
            <div className="md:col-span-8">
                <div className="w-3/4 h-7 bg-gray-300 rounded-lg mb-3"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded-lg mb-3"></div>
                <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
            </div>
            <div className="md:col-span-4 mt-3 md:mt-0 md:ml-3 font-medium">
                <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-3"></div>
                <div className="flex items-center justify-center">
                    <div className="self-center w-7 h-7 rounded-full bg-gray-300 mr-2"></div>
                    <div className="w-full">
                        <div className="w-3/4 h-6 bg-gray-300 rounded-lg mb-2"></div>
                        <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                        <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export const EditorSkeleton = () => {

    return (
        <div className="w-full flex justify-center">
            <div className="animate-pulse flex flex-col-reverse md:flex md:flex-col mx-6 md:mx-10 w-full lg:w-1/2">
                <div className="h-8 bg-gray-300 mt-5 md:mt-10 rounded-lg"></div>
                <div className="h-96 bg-gray-300 mt-5 md:mt-10 rounded-lg"></div>
                <div className="flex justify-evenly mt-5 md:mt-10">
                    <div className="h-8 bg-gray-300 rounded-lg w-44"></div>
                    <div className="h-8 bg-gray-300 rounded-lg w-44"></div>
                </div>
            </div>
        </div>
    )
}

export const YourBlogsSkeleton = () => {

    return (
        <div className="flex flex-col items-center mt-5 md:mt-10">
            <div className="animate-pulse w-full lg:w-2/4 mx-2 md:mx-10">
                <div className="h-8 bg-gray-300 rounded-lg mx-2"></div>
            </div>
            <BlogsSkeleton/>
        </div>
    )
}