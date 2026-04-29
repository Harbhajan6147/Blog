 import React, { useState } from 'react'
 import axiosInstance from '../axios/index.js';
 import { toast } from "react-toastify";
 const AddComment = ({formType,  parentComment, blog_id , buttonText  }) => {
        const [newComment, setNewComment]= useState("");

   
   
     const addComment = async(e) => {
    e.preventDefault();

    if (!newComment.trim()) return;
     try {
    const res = await axiosInstance.post("/api/blogs/add-comment", {
      blog:blog_id,
      parentComment,
      content:newComment,
    });

         if(res.data.success){
            if(!parentComment)
         toast.success("Comment added successfully 🎉");
        else  toast.success("Reply added successfully 🎉");
          setNewComment("");
          
         }
          

    
    return res.data;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
     toast.error("Failed to add comment ");
    throw error;
  }
     
  };


   return (
    <div className="mt-16 bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
    <p className="font-semibold text-lg mb-4 text-gray-800">
      {formType}
    </p>

    <form  className="flex flex-col gap-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Share your thoughts..."
        required
        className="w-full p-4 border border-gray-300 rounded-xl outline-none h-32
        focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all resize-none"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white 
          rounded-full px-6 py-2 text-sm font-medium
          shadow hover:shadow-lg hover:scale-105 transition-all"
          onClick={addComment}
        >
         {buttonText}
        </button>
      </div>
    </form>
  </div>
   )
 }
 
 export default AddComment


