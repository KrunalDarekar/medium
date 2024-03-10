import { Link } from "react-router-dom"

const SigninFlag = () => {

    return <div className="flex justify-center text-lg">
        <div className="flex justify-center w-full lg:w-2/4 mx-2 md:mx-10 border rounded-lg my-3 md:my-5">
            <p>to write an article</p>
            <Link to={'/signin'} className="underline mx-1"> sign in </Link>
            <p>or</p>
            <Link to={'/signup'} className="underline mx-1">sign up</Link>
        </div>
    </div>
}

export default SigninFlag