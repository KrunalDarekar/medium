import { Link, useLocation } from "react-router-dom"
import Avatar from "./Avatar"

const AppBar = () => {
    const location = useLocation()
    
    return (
        <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-300">
            <Link className="text-xl font-semibold" to={'/blogs'}>
                WriteScape
            </Link>
            <div className="flex">
                {location.pathname != "/create" && <Link to={'/create'} className="flex items-center mr-4 hover:text-gray-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
                    <div className="ml-1">New</div>
                </Link>}
                <Avatar name="krunal" size="big" />
            </div>
        </div>
    )
}

export default AppBar