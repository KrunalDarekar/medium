import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
    content: string,
    title: string,
    author: {
        name: string,
    }
    id: string,
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            setBlogs(res.data.blogs)
            setLoading(false)
        })
    },[])

    return {
        blogs,
        loading
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            setBlog(res.data)
            setLoading(false)
        })
    },[])

    return {
        blog,
        loading
    }
}