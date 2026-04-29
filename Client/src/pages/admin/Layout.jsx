import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  } from '@fortawesome/free-regular-svg-icons'
 import Navbar from '../../components/Navbar.jsx';
 import Notification from '../../components/Notification.jsx';
const Layout = () => {
 
        
      const { isOpenNotification} = useAuth();
   
   
    
  return (
    <>
    <div>
      <Navbar></Navbar>
    <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
         <Outlet></Outlet>
    </div>
    </div>
     <div>
         {isOpenNotification && <Notification />}
     </div>
    </>
  )
}

export default Layout