import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import useCreatePost from './hooks/postHooks/useCreatePost';
import { useSelector, useDispatch } from 'react-redux';
import { login as authLogin, login } from './store/authSlice';
import useLogin from './hooks/userHooks/useLogin';
import { Outlet } from 'react-router-dom';
import useGetUser from './hooks/userHooks/useGetUser';
import LoadingScreen from './components/LoadingScreen';
import useGetAllPosts from './hooks/postHooks/useGetAllPosts';
import ConfirmationBox from './components/ConfirmationBox';


function App() {
  const toggleDelete = useSelector((state) => state.post.deletePopup)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("testuser")
  const [email, setEmail] = useState("test@example.gmail.com")
  const [password, setPassword] = useState("testPassword")

  const { getUser } = useGetUser()
  const { getAllPosts, data } = useGetAllPosts()


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // 2000ms delay
    getUser()
    return () => clearTimeout(timer);
  }, [])
  // // console.log(data)

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className='relative overflow-x-hidden '>
        <Navbar />
        <div>
          {toggleDelete && <ConfirmationBox />}
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default App
