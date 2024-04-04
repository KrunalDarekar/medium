import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import EditorMenu from './EditorMenu'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { content } from '@/hooks'
import { UpdateBlogInput } from '@krunal-darekar/medium-common'
import { useToast } from './ui/use-toast'

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

  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const editor = useEditor({
    extensions,
    content,
  })

  const publish = async() => {
    setIsPublishDisabled(true)
    const content = editor?.getJSON() || {}
    const publishInputs: UpdateBlogInput = {
      content,
      id,
      published: true
    }
    try{
      const response = await axios.put( `${BACKEND_URL}/api/v1/blog`, publishInputs ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const Blogid = response.data.id
      navigate(`/blog/${Blogid}`)
    } catch(e: any) {
      toast({
        variant: "destructive",
        title: "uh oh! something went wrong.",
        description: "request failed check your connection."
      })
      setIsPublishDisabled(false)
    }
  }

  const save = async() => {
    setIsSaveDisabled(true)
    const content = editor?.getJSON() || {}
    const saveInputs:UpdateBlogInput = {
      content,
      id,
      published: false,
    }
    try{
      const response = await axios.put( `${BACKEND_URL}/api/v1/blog`, saveInputs ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const Blogid = response.data.id
      navigate(`/blog/${Blogid}`)
    } catch(e: any) {
      toast({
        variant: "destructive",
        title: "uh oh! something went wrong.",
        description: "request failed check your connection."
      })
      setIsSaveDisabled(false)
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
        <div className='flex justify-evenly'>
          <button onClick={publish} disabled={isPublishDisabled} className={`md:self-center md:px-20 mt-5 md:mt-10 border bg-green-600 hover:bg-green-500 rounded-lg text-lg text-white font-semibold px-4 py-1 ${isPublishDisabled ? 'cursor-not-allowed': ''}`}>
              {isPublishDisabled ? <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-green-400 border-t-white rounded-full animate-spin"></div>
                Publishing...
              </div> : "Publish"}
          </button>
          <button onClick={save} disabled={isSaveDisabled} className={`md:self-center md:px-20 mt-5 md:mt-10 border bg-yellow-600 hover:bg-yellow-500 rounded-lg text-lg text-white font-semibold px-4 py-1 ${isSaveDisabled ? 'cursor-not-allowed': ''}`}>
              {isSaveDisabled ? <div className="flex items-center">
              <div className="w-5 h-5 mr-2 border-2 border-yellow-400 border-t-white rounded-full animate-spin"></div>
                saving...
              </div> : "Save to draft"}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}


export default EditTiptap