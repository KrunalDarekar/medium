import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth action="Login"/>
                </div>
                <div className="hidden lg:block">
                    <Quote/>
                </div>
            </div>
        </>
    )
}