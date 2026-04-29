import React,{useEffect, useState} from 'react'
import axiosInstance from '../../axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { BlogCard } from '../../components/BlogCard';
const Saved = () => {
  const [showScroll, setShowScroll] = useState(false);
  const[ blog_data, set_blog_data] = useState([]);

 const getSavedBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/user/saved-blogs");

    if(response.data.success){
  set_blog_data(response.data.blogs)
    }
  
    
  } catch (error) {
    console.error("Error fetching saved blogs:", error);
    throw error;
  }
     };
  
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getSavedBlogs();
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  console.log(blog_data);
  return (
    <div className="bg-white min-h-screen relative">

    

      
      <div className="text-center mt-20 px-4">
        <h1 className="text-4xl font-bold text-gray-900">
         All Saved Blogs ✨
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Discover insights on technology, startups, finance, and lifestyle.
        </p>

        <div className="mt-4 inline-block px-6 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
          Curated for curious minds
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog_data.map((b) => (
          <BlogCard key={b._id} blogData={b} Saved={true} />
        ))}
      </div>

      {/* SCROLL TO TOP BUTTON */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      
    </div>
  );
}

export default Saved
