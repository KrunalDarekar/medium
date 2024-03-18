import { Editor } from "@tiptap/react";

const EditorMenu = ({editor}: {editor: Editor}) => {
  return (
    <div className="mb-5 flex justify-center mt-10 md:bg-gray-200 md:py-1.5 rounded-md">
            <div className='flex gap-2 flex-wrap'>
     <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={(editor.isActive('bold') ? 'is-active bg-gray-700 text-white' : '') + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back"}
      ><svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"/>
        </svg>
      </button>
       <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={(editor.isActive('italic') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.874 19l6.143-14M6 19h6.33m-.66-14H18"/>
        </svg>    
      </button>
       <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={(editor.isActive('strike') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12"/>
          <text x="50%" y="60%" textAnchor="middle" alignmentBaseline="middle" fontSize="22" fill="currentColor">S</text>
        </svg>
      </button>
      <div className="hidden md:block border-r border-gray-400"></div>
       <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={(editor.isActive('paragraph') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v7m0 7v-7m4-7v14m3-14H8.5A3.5 3.5 0 0 0 5 8.5v0A3.5 3.5 0 0 0 8.5 12H12"/>
        </svg>    
      </button>
       <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={(editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back  pt-1"}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <text x="5" y="20" fontFamily="Georgia, serif" fontSize="22" fill="currentColor">T</text>
        </svg>
      </button>
       <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={(editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <text x="6" y="18" fontFamily="Georgia, serif" fontSize="18" fill="currentColor">T</text>
        </svg>
      </button>
      <div className="hidden md:block border-r border-gray-400"></div>
       <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={(editor.isActive('bulletList') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
        </svg>
      </button>
       <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={(editor.isActive('orderedList') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
        </svg>    
      </button>
      <div className="hidden md:block border-r border-gray-400"></div>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={(editor.isActive('code') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
        </svg>        
      </button>
       <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={(editor.isActive('codeBlock') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m5 4-2 2 2 2m4-4 2 2-2 2m5-12v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
        </svg>    
      </button>
       <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={(editor.isActive('blockquote') ? 'is-active bg-gray-700 text-white' : '')  + " border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "}
      ><svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
        </svg>    
      </button >
       <button className="border-2 rounded-md px-3 md:px-2 md:border-0 md:hover:bg-gray-300 md:hover:text-back " onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <svg className="w-4 md:w-3 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="0" y1="12" x2="24" y2="12" />
        </svg>
      </button>
      <div className="hidden md:block border-r border-gray-400"></div>
       <button className="border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back  cursor-pointer"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
        </svg>
      </button>
       <button className="border-2 rounded-md p-2 md:p-1 md:border-0 md:hover:bg-gray-300 md:hover:text-back "
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <svg className="w-6 h-6  cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"/>
        </svg>
      </button>
  </div>
    </div>
  )
};

export default EditorMenu;
