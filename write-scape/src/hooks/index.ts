import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface content {
    content: Array<any>,
    type: "doc",
}

export interface image {
    imageUrl: string,
    publicId: string
}

export interface Blog {
    content: content,
    image: image,
    author: {
        name: string,
        description: string,
    }
    id: string,
    createdAt: string,
    authorId: string,
    published: boolean,
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

export const useMyBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/my`, {
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
    const [error, setError] = useState("")
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
        .catch(() => {
            setError("error while fetching blog")
            setLoading(false)
        })
    },[])

    return {
        blog,
        loading,
        error
    }
}