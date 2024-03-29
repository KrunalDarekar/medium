import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import Create from './pages/Create'
import { Landing } from './pages/Landing'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignedInAtom, userAtom } from './state/atoms/atoms'
import { useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from './config'
import "./App.css"
import { Toaster } from './components/ui/toaster'
import Edit from './pages/Edit'
import My from './pages/My'


function App() {
  const setUser = useSetRecoilState(userAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);
  const isSignedIn = useRecoilValue(isSignedInAtom)
  const token = localStorage.getItem('token')

  useEffect( () => {
    if(token && !isSignedIn) {
      axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then( res => {
        setUser(res.data)
        setIsSignedIn(true)
      })
    }
  },[])

  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<Create/>} />
          <Route path="/my" element={<My/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
