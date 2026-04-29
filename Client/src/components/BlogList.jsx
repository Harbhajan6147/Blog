import React, { useState, useEffect } from "react";
import {  blogCategories } from "../assets/assests";
import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/index.js";
import { useAuth } from "../Context/AuthContext.jsx";
export const BlogList = () => {
     
  let { blog_data, setBlogsData } = useAuth();
    
   const navigate = useNavigate();

    
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  
   const [loading,  setLoading] = useState(true);
   const [visibleBlogs, setVisibleBlogs] = useState([]);
   
  useEffect(() => {
  const filtered = blog_data?.filter((item) => {
    let categoryOk = true;
    
    if (activeCategory !== "All") {
      categoryOk = item.category === activeCategory.toLowerCase();
    }

    return categoryOk;
  });

  setVisibleBlogs(filtered);
}, [ activeCategory, blog_data]);

  
   const filterBlogonBasedOnTitle = () => {
  const filtered = blog_data?.filter((item) => {
    const searchOk = item.title
      ?.toLowerCase()
      .includes(query.toLowerCase());

    let categoryOk = true;
    if (activeCategory !== "All") {
      categoryOk = item.category === activeCategory.toLowerCase();
    } 
    

    return searchOk && categoryOk;
  });

  setVisibleBlogs(filtered);
};
  




  const limitedBlogs = visibleBlogs?.slice(0, 20);
   

   useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/api/blogs/allBlogs");
       
      
        if(res.data.success)
        setBlogsData(res.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
 

  
  return (
    <div>

      
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden max-sm:scale-75"
      >
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full pl-4 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-400 text-white px-8 py-2 m-1.5 rounded cursor-pointer hover:scale-105 transition-all"
          onClick={filterBlogonBasedOnTitle}
       >
          Search
        </button>
      </form>

      {/* categories… kinda like quick filters */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((cat) => (
          <div key={cat} className="relative">

            <button
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer px-2 py-1 text-gray-500 ${
                activeCategory === cat
                  ? "text-white bg-green-400 rounded-lg px-4"
                  : ""
              }`}
            >
              {cat}

              {activeCategory === cat && (
                <motion.div
                  layoutId="highlight"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 bg-primary rounded-full -z-10"
                />
              )}

            </button>
          </div>
        ))}
      </div>

      {/* blog grid... yeah this is where everything shows up */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">

       {limitedBlogs?.length ? (
  limitedBlogs?.map((b) => (
    <BlogCard key={b._id} blogData={b} />
  ))
) : (
  <p className="text-center col-span-full text-gray-500">
    No blogs found... maybe try something else?
  </p>
)}
   
      </div>
      {visibleBlogs?.length > 5 && (
  <div className="flex justify-center mt-10">
    <button

      onClick={() => navigate("/blogs")}
      className="px-8 py-3 bg-green-400 text-white rounded-full shadow-md 
      hover:bg-green-500 hover:scale-105 transition-all cursor-pointer"
    >
      View More Blogs ✨
    </button>
  </div>
)}

    </div>
  );
};

