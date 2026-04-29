import React, { useEffect, useState } from 'react'
import { faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogTableItem from '../../components/admin/BlogTableItem';
import axiosInstance from '../../axios/index.js';
const ListBlog = () => {
   
  const [blogs, setBlogs]= useState([]);
 const [count, setCount] = useState(0);
  const fetchBlogs = async () => {
  try {
    const res = await axiosInstance.get("/api/blogs/all");

      

    setBlogs(res.data.blogs);
    setCount(res.data.blogs.length);

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
 <h1>All blogs({count})</h1>


    <div className='relative h-4/5 mt-4  max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-xs text-gray-600 text-left uppercase'>
                <tr>
                   <th scope='col' className='px-2 py-4'>#</th>
                   <th scope='col' className='px-2 py-4'>Blog Title</th>
                   <th scope='col' className='px-2 py-4'>Date</th>
                   <th scope='col' className='px-2 py-4'>Status</th>
                   <th scope='col' className='px-2 py-4'>Actions</th>
                   <th scope='col' className='px-2 py-4 flex  '>

                    <p className='text-blue-500'> <FontAwesomeIcon icon={faThumbsUp} /></p>
                    <p>/</p> 
                    <p className='text-red-500'> <FontAwesomeIcon icon={faThumbsDown} /></p>
                   </th>

                </tr>
              </thead>
               <tbody>{
                blogs.map((blog,index)=>{
                  return <BlogTableItem key={blog._id} blogData={blog} fetchBlogs={fetchBlogs} index={index+1}/>
                })
                }</tbody>

            </table>
        </div>
    </div>
  )
}

export default ListBlog