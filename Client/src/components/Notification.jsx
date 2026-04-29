import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext.jsx'
import axiosInstance from '../axios/index.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate= useNavigate();
  const { isOpenNotification, setIsOpenNotification } = useAuth();
  const [notification, setNotifications] = useState([]);

  const markAllAsRead = async () => {
    try {
      await axiosInstance.put("/api/blogs/read-all-notifications");
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/api/blogs/all-notifications");
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchNotifications();
      await markAllAsRead();
    };
    init();
  }, []);

  return (
    <>
     
      <div className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpenNotification ? "translate-x-0" : "translate-x-full"
      }`}>

       
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={() => setIsOpenNotification(false)}
            className="text-red-600 cursor-pointer text-2xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

       
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {notification.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No notifications
            </p>
          ) : (
            notification.map((n) => {
              let message = "";

              if (n.type === "FOLLOW") {
                message = `${n.sender?.name} started following you`;
              }

              if (n.type === "NEW_BLOG") {
                message = `${n.sender?.name} published a new blog`;
              }

              return (
                <div
                  key={n._id}
                  
                  className={`w-full px-4 py-3 border-b cursor-pointer hover:bg-gray-100 ${
                    !n.isRead ? "bg-gray-50" : ""
                  }`}
                >
                  <p className={`text-sm ${n.type=='FOLLOW'?  'text-blue-400':'text-green-500'}`}>
                    {message}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>

                  {!n.isRead && (
                    <span className="inline-block mt-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

    
      {isOpenNotification && (
        <div
          onClick={() => setIsOpenNotification(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
    </>
  );
};

export default Notification;