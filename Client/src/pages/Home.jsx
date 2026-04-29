import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Header } from '../components/Header.jsx'
import { BlogList } from '../components/BlogList.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

import Notification from '../components/Notification.jsx'
import { useAuth } from '../Context/AuthContext.jsx'
const Home = () => {
  
    const { isOpenNotification} = useAuth();

  return (
    <>
    <div>

   
    <div>
      <Navbar/>
   <div className="min-h-screen">
   <Header/>
    <BlogList/>   
  <Newsletter/>
  <Footer/>
</div>
    </div>
   <div>
  
  {isOpenNotification && <Notification />}
   </div>
       
      

     </div>
   
    
    </>
    
  )
}

export default Home 