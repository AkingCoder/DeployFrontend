import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Protected from './components/AuthLayout.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Home from './pages/Home.jsx'
import EditPost from './pages/EditPost.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreatePost from './pages/CreatePost.jsx'
import BlogPage from './pages/BlogPage.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import AboutComponent from './components/AboutComponent.jsx'
import ContactPage from './pages/ContactPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/createPost",
        element: (
          <Protected authentication={true}>
            <CreatePost />
          </Protected>
        ),
      },
      {
        path: "/editPost/:postId",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/dashboard/:userId",
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        )
      },
      {
        path: "/blog/:postId",
        element: (
          <BlogPage />
        )
      },
      {
        path: "/blogs",
        element: (
          <AllBlogs />
        )
      },
      {
        path: "/about",
        element: (
          <AboutComponent />
        )
      },
      {
        path: "/contact",
        element: (
          <ContactPage />
        )
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
