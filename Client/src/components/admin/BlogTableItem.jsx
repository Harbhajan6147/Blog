import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from '../../axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const BlogTableItem = ({ blogData, index }) => {
  
  const [blog, setBlog] = useState(blogData);

  const { title, createdAt } = blog || {};

     const navigate = useNavigate();

  const BlogDate = createdAt ? new Date(createdAt) : null;

  const togglePublished = async () => {
    try {
      const res = await axiosInstance.patch(
        `/api/blogs/toggle-publish/${blog._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success && res.data.blog) {
        setBlog(res.data.blog);
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };


  const handleDeleteBlogButton = async () => {
       const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
       console.log(confirmDelete);
       if(confirmDelete){
 try {
    const res = await axiosInstance.delete(
      `/api/blogs/delete/${blog._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      
      toast.success("Blog deleted successfully ✅");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
     }
  }

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <button className='cursor-pointer' onClick={()=>navigate(`/user/${blog._id}/viewblog`)}><td className='px-2 py-4'>{title}</td></button>
      <td className='px-2 py-4 max-sm:hidden'>
        {BlogDate ? BlogDate.toDateString() : "No Date"}
      </td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog?.isPublished ? "text-green-600" : "text-orange-700"}`}>
          {blog?.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className='px-2 py-4 flex text-xs gap-3'>
        <button
          onClick={togglePublished}
          className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
        >
          {blog?.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button onClick={handleDeleteBlogButton}>

      
        <FontAwesomeIcon
          className='w-8 hover:scale-110 transition-all cursor-pointer text-red-700'
          icon={faXmark}
        />
          </button>
      </td>
      <td>
        {blogData?.Liked?.length}/{blogData?.Disliked?.length}
      </td>
    </tr>
  );
};

export default BlogTableItem;