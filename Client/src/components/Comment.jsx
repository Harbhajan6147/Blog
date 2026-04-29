import React, { useState, useEffect } from "react";
import Moment from "moment";
import axiosInstance from "../axios/index.js";
import AddComment from "./AddComments.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

const Comment = ({ blog_id }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [replyIdx, setReplyIdx] = useState(-1);

 
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/api/blogs/getBlogComments/${blog_id}`
        );

        if (res.data.success) {
          setComments(res.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blog_id) {
      fetchComments();
    }
  }, [blog_id]);

 
  useEffect(() => {
    if (replyIdx !== -1 && comments[replyIdx]) {
      const commentId = comments[replyIdx]._id;

      const fetchReplies = async () => {
        try {
          setLoading(true);

          const res = await axiosInstance.get(
            `/api/blogs/getReplies/${commentId}`
          );

          if (res.data.success) {
            setReplyComments(res.data.replies);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchReplies();
    } else {
      setReplyComments([]);
    }
  }, [replyIdx, comments]); // ✅ FIX

  const handleReply = (index) => {
    setReplyIdx(index);
  };

  return (
    <div className="mt-20 mb-16 max-w-3xl mx-auto px-4">

      <div className="flex items-center justify-between mb-8">
        <p className="font-bold text-2xl text-gray-800">
          Comments ({comments.length})
        </p>
        <div className="h-[2px] flex-1 ml-4 bg-gradient-to-r from-green-400 to-transparent rounded-full" />
      </div>

      <div className="flex flex-col gap-6">
        {comments.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white border p-5 rounded-2xl shadow-sm"
          >

           <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center">
                {item?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                {item.user?._id === user.id ? (
                  "You"
                ) : (
                  <p className="font-semibold">{item.user?.name}</p>
                )}
                <p className="text-xs text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </p>
              </div>
            </div>

           
            <p className="text-sm text-gray-700 ml-14">
              {item.content}
            </p>

            
            <div className="mt-4 ml-14">
              {replyIdx === index ? (
                <button
                  className="cursor-pointer text-sm text-red-500"
                  onClick={() => setReplyIdx(-1)}
                >
                  Hide Reply
                </button>
              ) : (
                <button
                  className="text-sm text-green-600 cursor-pointer"
                  onClick={() => handleReply(index)}
                >
                  Reply
                </button>
              )}
            </div>

            
            {replyIdx === index && (
              <div className="ml-14 mt-3">
                <AddComment
                  formType="Add a Reply"
                  parentComment={item._id} 
                  blog_id={blog_id}
                  buttonText="Post Reply"
                />
              </div>
            )}

            {replyIdx === index && (
              <div className="ml-14 mt-4 space-y-3">
                {replyComments.map((reply, replyIndex) => (
                  <div
                    key={reply._id || replyIndex}
                    className="bg-gray-50 border p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center">
                        {reply?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        {reply.user?._id === user.id ? (
                          "You"
                        ) : (
                          <p className="font-semibold">{reply.user?.name}</p>
                        )}
                        <p className="text-xs text-gray-400">
                          {Moment(reply.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 ml-12">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      
      <AddComment
        formType="Add a Comment"
        parentComment={null}
        blog_id={blog_id}
        buttonText="Post Comment"
      />
    </div>
  );
};

export default Comment;