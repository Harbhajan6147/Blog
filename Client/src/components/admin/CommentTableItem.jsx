import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../axios/index.js';
export const CommentTableItem= ({comment, blog_title,fetchComments})=>{
  const {createdAt,_id}= comment
  const BlogDate= new Date(createdAt);
  
 const toogleCommentStatus = async () => {
  try {
    const res = await axiosInstance.patch(`/api/user/toggle-status/${_id}`);

    if (res.data.success) {
     
      fetchComments();
    }
  } catch (error) {
    console.log(error?.response?.data || error.message);
  }
};

  

  const handleDeleteComment = async () => {
  const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
  if (!isConfirmed) return;

  try {
    const res = await axiosInstance.delete(`/api/user/delete/${_id}`);

    if (res.data.success) {
    
      fetchComments();
    }
  } catch (error) {
    console.log(error?.response?.data || error.message);
  }
};
       return (
       <tr className='order-y border-gray-300'>
          <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog</b> :{blog_title}
               <br />
               <br />
               <b className='font-medium text-gray-600'>Name</b>: {comment?.user?.name}
               <br />
               <p title={comment.content}>
               <b className='font-medium text-gray-600'    >comment</b>: {  comment.content.split(' ').slice(0, 5).join(' ') +
  (comment.content.split(' ').length > 5 ? '...' : '')
}
   </p>

          </td>
          <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()} 
          </td>
          <td className='px-6 py-4  flex gap-2'>
            <button onClick={toogleCommentStatus} className='inline-flex items-center gap-4'>
                {comment.isApproved ? <p className=' cursor-pointer text-xs border border-red-600 bg-red-100 text-red-400 rounded-full px-3 py-1'>Not-Approved</p> :<p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 cursor-pointer py-1'>Approved</p> }
           </button>
           <button onClick={handleDeleteComment}>
            <FontAwesomeIcon icon={faTrash} className='w-5 hover:scale-110 transition-all cursor-pointer'/>
           
           </button>
          </td>
       </tr>
       )

}
