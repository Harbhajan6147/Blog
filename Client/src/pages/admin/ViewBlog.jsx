import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading]= useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/api/blogs/${id}`);
        setBlog(res.data.blog || res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading blog...
        </p>
      </div>
    );

  return (
       <div  className='flex-1 bg-blue-50/50 text-gray-600 h-full'>
           <div className='bg-white w-full max-w-3xl p-4 md:p-10'>

            
               <img src={blog.image} alt="Preview" className='max-h-full max-w-full object-contain' />
             
             <p className='mt-4'>Blog title *</p>
             <p
              
               type="text" 
               placeholder='Type here' 
               required 
               className='focus:ring-2 focus:ring-green-400 w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
             >{blog.title}
              </p>
             
             <p className='mt-4'>Sub title *</p>
             <p
              
               type="text" 
               placeholder='Type here' 
               required 
               className='focus:ring-2 focus:ring-green-400 w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
             >{blog.subTitle}</p>
     
             <p className='mt-4'>Blog Description *</p>
             <div className='max-w-2xl w-full pt-2 relative'>
               <textarea value={blog.description}
                  placeholder="Write your blog description here..."
                  className='w-full min-h-[250px] max-h-[500px] resize-none overflow-y-auto border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400'
                 />
                
                     </div>
     
             <p className='mt-4'>Blog category *</p>
             <p
               value={blog.category}
               name="category" 
               className='focus:ring-2 focus:ring-green-400 mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
             >
               {blog.category} 
             </p>
     
             <div className='flex gap-2 mt-4 '>
                 {blog.isPublished ? (
                   <p className='text-green-600'>Published</p>
                 ) : (
                   <p className='text-orange-700'>Unpublished</p>
                 )}
             </div>
     
             <button 
               type='submit' 
               disabled={loading}
               className={`mt-8 w-40 h-10 bg-green-500 text-white rounded cursor-pointer text-sm ${loading ? 'opacity-50' : ''}`}
             >
             Edit blog
             </button>
           </div>
         </div>
  );
};

export default ViewBlog;
