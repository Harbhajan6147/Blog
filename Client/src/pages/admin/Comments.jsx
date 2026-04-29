
import React, {useState, useEffect} from 'react'
import { comments_data } from '../../assets/assests';
import { CommentTableItem } from '../../components/admin/CommentTableItem';
import axiosInstance from '../../axios/index.js';
const Comments = () => {
  const [comments, setComments]= useState([]);
  const [filter, setFilter]= useState('Approved');
  const [selectedBlog,  setSelectedBlog]= useState();
  const fetchComments= async ()=>{
     try {
    const res = await axiosInstance.get("/api/user/get-allComment-myBlog");
     if(res.data.success){

       
       const commentData = res.data.comments || {};
       setComments(commentData);
        const keys = Object.keys(commentData);
      
         if (!selectedBlog || !commentData[selectedBlog]) {
        if (keys.length > 0) {
          setSelectedBlog(keys[0]);
        } else {
          setSelectedBlog(null);
        }
      }
    
     }
    return res.data; // { success, comments }
  } catch (error) {
    console.error(error.response?.data || error.message);
    return { success: false, comments: {} };
  }
     
  }

   useEffect(() => {
    fetchComments();
   }, []);
 

    const selectedComments = selectedBlog? comments[selectedBlog]?.comments || []: [];
 
  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl '>
      <h1>Comments</h1>
      <div className='flex gap-4 '>
        <button onClick={()=> setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-sm ${filter === 'Approved'?'text-green-500':'text-gray-700'}`}>Approved</button>
         <button onClick={()=> setFilter('Not Approved')} className={`shadow-custim-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter==='Not Approved'?'text-green-500':'text-gray-700'}`}>Not Approved</button>
   
      </div>
      </div>
      <div className='Drop-Down'>
       
      <select
        className="border p-2 mt-4 rounded mb-4 "
        value={selectedBlog}
        onChange={(e) => setSelectedBlog(e.target.value)}
      >
        {Object.keys(comments).map((blogId) => (
          <option key={blogId} value={blogId} >
            {comments[blogId].blogTitle}
          </option>
        ))}
      </select>
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
        <thead className='text-xs text-gray-700 text-left uppercase '>
          <tr>
            <th scope='col' className='px-6 py-3 '>Bog Title & Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
                <th scope='col' className='px-6 py-3 '>Action</th>
          </tr>
        </thead>
       <tbody>
  {
    (() => {
      const filteredComments = selectedComments.filter((comment) => {
        if (filter === 'Approved') return comment.isApproved === true;
        else  return comment.isApproved === false;
       
      });

      if (filteredComments.length === 0) {
        return (
          <tr>
            <td colSpan="100%" className="text-center py-6 text-gray-400">
              No Comments Found
            </td>
          </tr>
        );
      }

      return filteredComments.map((comment, index) => (
        <CommentTableItem
          key={comment._id}
          blog_title={comments[selectedBlog].blogTitle}
          comment={comment}
          index={index + 1}
          fetchComments={fetchComments}
        />
      ));
    })()
  }
</tbody>
       </table>
      </div>
    </div>
  )
}

export default Comments