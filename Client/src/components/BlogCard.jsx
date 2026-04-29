import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export const BlogCard = ({ blogData, Saved }) => {
  const { title, description, category, image, _id } = blogData;
  
  const navigate = useNavigate();

  return (
    <div
    
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 "
    >
      
      <div className='cursor-text'>

     
      <div className="relative">
        <img src={image} alt="" className="aspect-video w-full object-cover" />

       
        {Saved && (
          <button className="absolute top-2 right-2  rounded-full shadow">
            <FontAwesomeIcon icon={faBookmark} className="text-yellow-600 text-sm" />
          </button>
        )}
      </div>
   </div>
       <div   onClick={() => navigate(`/blog/${_id}`)} className="cursor-pointer" >

       
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-green-50 rounded-full text-green-400 text-xs">
        {category}
      </span>

      
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>

        </div>
    </div>
  );
};

