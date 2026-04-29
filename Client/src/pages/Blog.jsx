import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';

import { faThumbsUp, faThumbsDown, faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from '../components/Footer.jsx';
import BlogNotFound from '../components/NotFound.jsx';
import Comment from '../components/Comment.jsx';
import axiosInstance from '../axios/index.js';

const Blog = () => {

 

  const navigate = useNavigate();
  const { blogId } = useParams();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  
const fetchFollowStatus = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/user/check-follow/${data?.author?._id}`
      );
      console.log("Follow status response:", res.data);
      setIsFollowing(res.data.isFollowing);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);

      const { data } = await axiosInstance.post(`/api/blogs/toggle-like/${blogId}`);

      if (data.success) {
        setLiked(data.isLiked);
        setDisliked(data.isDisLiked);
        setLikesCount(data.likesCount);
        setDislikesCount(data.dislikesCount);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setActionLoading(false);
    }
  };

 
  const handleDislike = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);

      const { data } = await axiosInstance.post(`/api/blogs/toggle-dislike/${blogId}`);

      if (data.success) {
        setLiked(data.isLiked);
        setDisliked(data.isDisLiked);
        setLikesCount(data.likesCount);
        setDislikesCount(data.dislikesCount);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setActionLoading(false);
    }
  };
 

  const toogleSave = async () => {
    try {
      const res = await axiosInstance.post(`/api/blogs/toggle-save/${blogId}`);
      console.log("Toggle save response:", res.data);
      setSaved(res.data.saved);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  
  const fetchBlogData = async () => {
    try {
      const res = await axiosInstance.get(`/api/blogs/${blogId}`);

      if (res.data.success) {
        console.log("Blog data fetched:", res.data);
        setData(res.data.blog);
        setSaved(res.data.isSaved);
        setLiked(res.data.isLiked);
        setDisliked(res.data.isDisLiked);
        setLikesCount(res.data.likesCount);
        setDislikesCount(res.data.dislikesCount);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

   const followUser = async (userId) => {
  try {
    const res = await axiosInstance.post(`/api/user/follow-user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

 const unfollowUser = async (userId) => {
  try {
   
    const res = await axiosInstance.post(`/api/user/unfollow-user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const handleFollowToggle = async (e) => {

  if (!data?.author?._id) return;

  try {
   

    if (isFollowing) {
      await unfollowUser(data.author._id);
      setIsFollowing(false);
    } else {
      await followUser(data.author._id);
      setIsFollowing(true);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchBlogData();
}, [blogId]);


useEffect(() => {
  if (data?.author?._id) {
    fetchFollowStatus();
  }
}, [data?.author?._id]);

  if (loading) return <p>Loading...</p>;

  
  if (!data) return <BlogNotFound />;
 console.log(data.author._id);
  return (
    <div className="relative bg-white">

      <Navbar />

      {/* HEADER */}
      <div className="text-center mt-24 px-4 text-gray-600">
        <p className="text-green-500 py-2 text-sm">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold max-w-4xl mx-auto">
          {data.title}
        </h1>

        <h2 className="my-5 max-w-2xl mx-auto text-gray-500">
          {data.subTitle}
        </h2>
        
       <div className="">
  

  <button onClick={()=>navigate(`/blogs/${data?.author?._id}`)} className="cursor-pointer hover:bg-green-400 hover:text-white inline-flex items-center gap-2 py-1 px-5 rounded-full border-2 border-black text-green-600">
    <FontAwesomeIcon icon={faUser} />
    {data?.author?.name || "Admin"}
  </button>

 
   

</div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center mt-10 px-4">
        <img
          src={data.image}
          className="w-full max-w-5xl h-[420px] object-cover rounded-3xl"
        />
      </div>

      {/* DESCRIPTION */}
      <div
        className="mt-12 max-w-3xl mx-auto text-lg text-gray-700 px-4"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

      {/* ACTIONS */}
      <div className="max-w-3xl mx-auto mt-10 px-4 flex gap-6">

        {/* LIKE */}
        <button
          onClick={handleLike}
          disabled={actionLoading}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium transition-all duration-200
            ${liked
              ? "bg-green-500 text-white border-green-500 scale-105 shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600"}
            ${actionLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            active:scale-95
          `}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          {likesCount}
        </button>

        {/* DISLIKE */}
        <button
          onClick={handleDislike}
          disabled={actionLoading}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium transition-all duration-200
            ${disliked
              ? "bg-red-500 text-white border-red-500 scale-105 shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"}
            ${actionLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            active:scale-95
          `}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
          
        </button>

        {/* SAVE */}
        <button
          onClick={toogleSave}
          className={`
           cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium transition-all
            ${saved
              ? "bg-yellow-400 text-white border-yellow-400"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-100"}
          `}
        >
          <FontAwesomeIcon icon={saved ? solidBookmark : regularBookmark} />
          {saved ? "Saved" : "Save"}
        </button>

         <button
         type="button"
    onClick={handleFollowToggle}
    className={`cursor-pointer inline-flex items-center gap-2 py-1 px-5 rounded-full border-2 
    ${isFollowing 
      ? "border-green-600 bg-green-400 text-white" 
      : "border-yellow-500 text-yellow-500  hover:text-green-500 hover:border-green-500"
    }`}
  >
    {isFollowing ? "Following" : "Follow"}
  </button>

      </div>

      <Comment blog_id={data._id} />

      <Footer />
    </div>
  );
};

export default Blog;