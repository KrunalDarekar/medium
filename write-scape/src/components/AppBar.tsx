import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const AppBar = () => {
    return (
        <div className="flex justify-between items-center px-10 py-5 border-b border-slate-300">
            <Link className="text-xl font-semibold" to={'/blogs'}>
                WriteScape
            </Link>
            <div>
                <Avatar name="krunal" size="big" />
            </div>
        </div>
    )
}

export default AppBar