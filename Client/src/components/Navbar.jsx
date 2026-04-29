import React,{useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import {useAuth} from '../Context/AuthContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  } from '@fortawesome/free-regular-svg-icons'
 import axiosInstance from '../axios/index.js'
   import { useParams } from 'react-router-dom'
const Navbar = () => {
    
    const { id } = useParams();


    const {isOpenNotification, setIsOpenNotification, setToken, setUser}=useAuth();
   
      const logout= ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        setToken(null);
        setUser(null);
    }
    const navigate = useNavigate();
   
    const [showDot, setShowDot] = useState(false);
      const { token, user } = useAuth();

        
    const username= user?.name;
  
    const handleNotificationClick = async() => {
         setIsOpenNotification(prev=>!prev);
        setShowDot(false);
      };

 

  
  

  const hasUnread = async()=>{
    try {
    const res=  await axiosInstance.get("/api/blogs/check-unread");
    if(res.data.success){
      setShowDot(res.data.hasUnread);
    }
     
    } catch (err) {
      console.error(err);
    }
  }
    useEffect(()=>{
        
        hasUnread();
    },[])

    
  return (
    <div className="flex justify-between items-center py-4 mx-6 sm:mx-16 xl:mx-32">

  
  <span
    onClick={() => navigate("/")}
    className="text-2xl sm:text-3xl font-semibold cursor-pointer"
  >
    <span className="underline decoration-green-500">
      pu<span className="text-green-500">b</span>lish
    </span>
    .
    <span className="text-green-500 underline decoration-black">ai</span>
  </span>

  
  <div className="flex items-center gap-6">

   {token &&
    <button
      onClick={handleNotificationClick}
      className="cursor-pointer hover:text-red-600 relative text-xl text-gray-600  transition"
    >
      <FontAwesomeIcon icon={faHeart} />

    
      {showDot && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></span>
      )}
    </button>
}

  
   

   
    {token ? !id ? (
      <div
        onClick={() => navigate(`/user/${id}`)}
        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center cursor-pointer hover:scale-110 transition shadow-md"
        title="Go to profile"
      >
        {username ? username.charAt(0).toUpperCase() : "U"}
      </div>
    ): (<button onClick={logout} className='bg-green-500 text-white px-6 py-2 rounded-2xl  cursor-pointer'>logout</button>): <button
        onClick={() => navigate("/login")}
        className="rounded-full text-sm bg-green-400 text-white px-6 py-2 hover:scale-105 transition"
      >
        Login
      </button>}

  </div>
</div>
  )
}

export default Navbar

