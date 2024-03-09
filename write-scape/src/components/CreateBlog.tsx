import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isDisabled, setIsDisabled] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
      if (titleRef.current){
        titleRef.current.focus()
      }
    },[])

    const publish = async() => {
      setIsDisabled(true)
      try{
        const response = await axios.post( `${BACKEND_URL}/api/v1/blog`, {
          title,
          content
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const id = response.data.id
        navigate(`/blog/${id}`)
      } catch(e: any) {
        if(e.response.errror) {
          alert(e.response.error)
        } else {
          alert("request failed check your connection")
        }
      }
    }

    const scrollbarStyles = {
        scrollbarWidth: 'thin' as 'thin', // For Firefox
        scrollbarColor: '#888 #f1f1f1' as '-webkit-scrollbar-color', // For Firefox
        MsOverflowStyle: 'none' as 'none', // For IE
        '&::webkitScrollbar': {
          width: '12px', /* Width of the scrollbar */
        },
        '&::webkitScrollbarTrack': {
          backgroundColor: '#f1f1f1', /* Color of the track */
        },
        '&::webkitScrollbarThumb': {
          backgroundColor: '#888', /* Color of the thumb */
          borderRadius: '6px', /* Radius of the thumb */
        }
    };

    return (
        <div className="px-6 md:px-10 mt-5 md:mt-10 w-full">
            <div className="flex flex-col items-center">
                <input className="text-3xl outline-none mb-2 w-full lg:w-2/5"
                ref={titleRef} type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Title"/>
                <textarea className="outline-none w-full lg:w-2/5 h-2/4"
                rows={15} value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Tell your story..."
                style={scrollbarStyles}/>
                <button onClick={publish} disabled={isDisabled} className={`mt-5 md:mt-10 border bg-green-600 hover:bg-green-500 rounded-lg text-lg text-white font-semibold px-4 py-1 ${isDisabled ? 'cursor-not-allowed': ''}`}>
                    {isDisabled ? <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-green-400 border-t-white rounded-full animate-spin"></div>
                      Publishing...
                    </div> : "Publish"}
                </button>
            </div>
        </div>
    )
}