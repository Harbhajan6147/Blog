import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { blogCategories } from '../../assets/assests';
import axiosInstance from '../../axios/index.js';
 import { ToastContainer, toast } from 'react-toastify';

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  

  const [imagePreview, setImagePreview] = useState(null);

  const [image, setImage] = useState(null);  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
   const [description, setDescription] = useState('');
  
  
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

 
  
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


 const generateDescription = async (prompt) => {
  try {
    const res = await axiosInstance.post(
  "/api/blogs/generate-description",
  {
    title,
  },
  {
    timeout: 6000000, 
  }
);
    console.log(res?.data?.description)
    return res.data;
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

   const generateContent = async() => {
     console.log("Generating content...");

    await  generateDescription();

  }

   const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("category", category);
    formData.append("isPublished", isPublished);
    formData.append("description", description);

    const toastId = toast.loading("Uploading blog...");

    const res = await axiosInstance.post("/api/blogs/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
     
      toast.update(toastId, {
        render: "Blog added successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

    
      setTitle("");
      setSubtitle("");
      setCategory("Startup");
      setIsPublished(false);
      setDescription("");
      setImage(null);
      setImagePreview(null);
    } else {
      toast.update(toastId, {
        render: res.data.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }

    console.log(res.data);
  } catch (error) {
    console.error(error);

    
    toast.error(error.response?.data?.message || "Upload failed ❌");
  }
};
   
 
 
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10'>
        <p>Upload thumbnail</p>
        <label htmlFor="image" className='mt-2 w-full max-w-lg h-64 bg-gray-100 rounded flex items-center justify-center overflow-hidden'>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className='max-h-full max-w-full object-contain' />
          ) : (
            <div className='mt-2 h-16 w-16 border border-dashed border-gray-400 flex items-center justify-center rounded'>
              <span className='text-gray-400 text-xs focus:ring-2 focus:ring-green-400'>Upload</span>
            </div>
          )}
          <input 
            onChange={handleImageChange} 
            type="file" 
            id="image" 
            accept="image/*" 
            hidden 
          />
        </label>
        <p className='mt-4'>Blog title *</p>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          type="text" 
          placeholder='Type here' 
          required 
          className='focus:ring-2 focus:ring-green-400 w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
        />
        
        <p className='mt-4'>Sub title *</p>
        <input 
          value={subtitle} 
          onChange={e => setSubtitle(e.target.value)} 
          type="text" 
          placeholder='Type here' 
          required 
          className='focus:ring-2 focus:ring-green-400 w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' 
        />

        <p className='mt-4'>Blog Description *</p>
        <div className='max-w-2xl w-full pt-2 relative'>
          <textarea
           value={description}
              onChange={(e) => setDescription(e.target.value)}
             placeholder="Write your blog description here..."
             className='w-full min-h-[250px] max-h-[500px] resize-none overflow-y-auto border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400'
            />
            <button 
             type='button' 
               onClick={generateContent}
                disabled={generating}
              className={`absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer ${
                 generating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                >
               {generating ? 'Generating...' : 'Generate with AI'}
              </button>
                </div>

        <p className='mt-4'>Blog category *</p>
        <select 
          onChange={e => setCategory(e.target.value)} 
          value={category}
          name="category" 
          className='focus:ring-2 focus:ring-green-400 mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
        >
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4 '>
          <p>Publish Now</p>
          <input 
            type="checkbox" 
            checked={isPublished} 
            className='cursor-pointer scale-125 ' 
            onChange={e => setIsPublished(e.target.checked)} 
          />
        </div>

        <button 
          type='submit' 
          disabled={loading}
          className={`mt-8 w-40 h-10 bg-green-500 text-white rounded cursor-pointer text-sm ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;