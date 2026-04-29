import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import Comments from './pages/admin/Comments.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import Layout from './pages/admin/Layout.jsx'
import Login from './components/admin/Login.jsx'
import 'quill/dist/quill.snow.css' 
import Signup from './components/admin/Signup.jsx'
import AllBlogs from './pages/AllBlog.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import PublicRoute from './components/PublicRoutes.jsx'
import ViewBlog from './pages/admin/ViewBlog.jsx'
import Saved from './pages/admin/Saved.jsx'
import AllUserBlogs from './pages/AllUserBlogs.jsx'
const App = () => {

     
    
  return (
   <Routes>

    <Route path="/" element={<Home/>} />

    <Route path="/blogs" element={<AllBlogs />} />
      <Route path="/blog/:blogId" element={<Blog/>}/>
      <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
      <Route path="/login" element={ <PublicRoute>  <Login /> </PublicRoute>}/>
      <Route path='/blogs/:authorId' element={<AllUserBlogs/>}/>    


     <Route element={<ProtectedRoute />}>

       <Route path="/user/:id" element={<Layout />}>
      
  
         <Route index element={<Dashboard />} />
         <Route path="addBlog" element={<AddBlog />} />
         <Route path="listBlog" element={<ListBlog />} />
         <Route path="comments" element={<Comments />} />
         <Route path="viewblog" element={<ViewBlog/>}/>
         <Route path="saved" element={<Saved/>}/>
         
         
        </Route>

      </Route>

      
   
   </Routes>
  )
}

export default App