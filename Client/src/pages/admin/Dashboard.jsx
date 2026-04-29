import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper,faComments } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from '../../axios/index.js';
import { useNavigate } from 'react-router-dom';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate= useNavigate();
  const [dashboardData, setDashboardData] = useState({
     blogs:0,
     comments:0,
     drafts:0,
     recentBlogs:[]
  })

    const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("");
  console.log(modalType)
  const fetchDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get("/api/user/dashboard");

    if (data.success) {

      setDashboardData({
        blogs: data.dashboardData.blogs,
        comments: data.dashboardData.comments,
        drafts: data.dashboardData.drafts,
        recentBlogs: data.dashboardData.recentBlogs,
        followers: data.dashboardData.followers,
        following: data.dashboardData.following
      });

    }
  } catch (error) {
    console.error("Error fetching dashboard:", error.message);
  }
};

  useEffect(() => {

    fetchDashboardData();

  }, []);


  
  
  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    
    {/* Modal Box */}
    <div className="bg-white w-[400px] max-h-[500px] rounded-xl shadow-lg p-4 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold capitalize text-green-400">
          {modalType}
        </h2>
        <button className='cursor-pointer' onClick={() => setShowModal(false)}>✖</button>
      </div>

      {/* Scrollable List */}
      <div className="overflow-y-auto mt-3 space-y-3">
        {(modalType === "followers"
          ? dashboardData?.followers
          : dashboardData?.following
        )?.map((user, index) => (
          
         <div
         onClick={()=>navigate(`/blogs/${user._id}`)}
  key={index}
  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
>
 
  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
    <span className="text-sm font-semibold text-white">
      {user.name?.charAt(0).toUpperCase()}
    </span>
  </div>

  <p className="font-medium">{user.name}</p>
</div>
        ))}
      </div>

    </div>
  </div>
)}
      <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
              <FontAwesomeIcon icon={faHouse}/>
             <div>

             <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
            
             </div>
           
          </div>

          <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
              <FontAwesomeIcon icon={faFilePen} />
             <div>

             <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
            
             </div>
           
          </div>
            <div  onClick={() => { setModalType("following");setShowModal(true) }} className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
           

           <p className='text-xl font-semibold text-gray-600'>{dashboardData?.following?.length}</p>
            <p className='text-gray-400 font-light'>Following</p>
           
           
          </div>
          <div onClick={() => {setModalType("followers");setShowModal(true);}} className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            
            

             <p className='text-xl font-semibold text-gray-600'>{dashboardData?.followers?.length}</p>
            <p className='text-gray-400 font-light'>Followers</p>
            
            
           
          </div>
        

            



      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'> 
           <FontAwesomeIcon icon={faNewspaper} />
         <p>Latest Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-xs text-gray-600 text-left uppercase'>
                <tr>
                   <th scope='col' className='px-2 py-4'>#</th>
                   <th scope='col' className='px-2 py-4'>Blog Title</th>
                   <th scope='col' className='px-2 py-4'>Date</th>
                   <th scope='col' className='px-2 py-4'>Status</th>
                   <th scope='col' className='px-2 py-4'>Actions</th>
                   <th scope='col' className='px-2 py-4 flex'>
                    <p className='text-blue-500'> <FontAwesomeIcon icon={faThumbsUp} /></p>
                                        <p>/</p> 
                                        <p className='text-red-500'> <FontAwesomeIcon icon={faThumbsDown} /></p>
                   </th>
                </tr>
              </thead>
               <tbody>{
                dashboardData.recentBlogs.map((blog,index)=>{
                
                  return <BlogTableItem key={blog._id} blogData={blog} fetchBlogs={fetchDashboardData} index={index+1}/>
                })
                }</tbody>

            </table>
        </div>
      </div>


    </div>
  )
}

export default Dashboard