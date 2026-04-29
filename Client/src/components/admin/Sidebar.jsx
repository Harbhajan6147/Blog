import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faList, faBookmark  } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {useAuth} from '../../Context/AuthContext.jsx';
const Sidebar = () => {
  const {token, user} = useAuth();
  const id= user?.id;

  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
        <NavLink end={true} to={`/user/${id}`} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive&&"bg-green-50 border-r-4 border-green-400"}` }>
           <FontAwesomeIcon icon={faHouse} className='min-w-4 w-5'/>
         <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        <NavLink  to={`/user/${id}/addBlog`} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive&&"bg-green-50 border-r-4 border-green-400"}` }>
           <FontAwesomeIcon icon={faPlus } className='min-w-4 w-5'/>
         <p className='hidden md:inline-block'>Add blogs</p>
        </NavLink>
          <NavLink  to={`/user/${id}/listBlog`} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive&&"bg-green-50 border-r-4 border-green-400"}` }>
           <FontAwesomeIcon icon={faList} className='min-w-4 w-5'/>
         <p className='hidden md:inline-block'>Blog lists</p>
        </NavLink>
        <NavLink  to={`/user/${id}/comments`} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive&&"bg-green-50 border-r-4 border-green-400"}` }>
           <FontAwesomeIcon icon={faComment} className='min-w-4 w-5'/>
         <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
         <NavLink  to={`/user/${id}/saved`} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive&&"bg-green-50 border-r-4 border-green-400"}` }>
           <FontAwesomeIcon icon={faBookmark} className='min-w-4 w-5'/>
         <p className='hidden md:inline-block'>Saved Blogs</p>
        </NavLink>

    </div>
  )
}

export default Sidebar