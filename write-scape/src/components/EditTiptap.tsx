import { useEditor, EditorContent, FloatingMenu, BubbleMenu, generateHTML, nodeInputRule } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import EditorMenu from './EditorMenu'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { content } from '@/hooks'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

// define your extension array
export const extensions = [
  CustomDocument,
  StarterKit.configure({
    document: false,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if(node.type.name === 'heading') {
        return `Title`
      }
      return "write ..."
    }
  })
]

const EditTiptap = ({content, id}:{content:content, id:string}) => {

  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate()

  const editor = useEditor({
    extensions,
    content,
  })

  const update = async() => {
    setIsDisabled(true)
    const content = editor?.getJSON() || {}
    try{
      const response = await axios.put( `${BACKEND_URL}/api/v1/blog`, {
        content,
        id
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const Blogid = response.data.id
      navigate(`/blog/${Blogid}`)
    } catch(e: any) {
      if(e.response.errror) {
        alert(e.response.error)
      } else {
        alert("request failed check your connection")
      }
    }
  }

  if(!editor) {
    return <></>
  }

  return (
    <>
    <div className='w-full flex justify-center'>
      <div className='flex flex-col-reverse md:flex md:flex-col mx-6 md:mx-10 w-full lg:w-1/2'>
        <EditorMenu editor={editor} />
        <div className='border-x border-gray-500 mt-10'>
          <EditorContent editor={editor} className='h-96 px-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-conrner-transparent'/>
        </div>
        <button onClick={update} disabled={isDisabled} className={`md:self-center md:px-20 mt-5 md:mt-10 border bg-green-600 hover:bg-green-500 rounded-lg text-lg text-white font-semibold px-4 py-1 ${isDisabled ? 'cursor-not-allowed': ''}`}>
            {isDisabled ? <div className="flex items-center">
            <div className="w-5 h-5 mr-2 border-2 border-green-400 border-t-white rounded-full animate-spin"></div>
              Updating...
            </div> : "Update"}
        </button>
      </div>
    </div>
    </>
  )
}


export default EditTiptap