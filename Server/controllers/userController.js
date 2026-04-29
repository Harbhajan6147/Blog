import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import { createFollowNotification } from '../Services.js';



export const getAllBlogsAdmin = async (req, res) =>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



export const getCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const blogs = await Blog.find({ author: userId }).select("_id title");

    const blogIds = blogs.map(blog => blog._id);

    
    const comments = await Comment.find({ blog: { $in: blogIds } })
      .populate("blog", "title subTitle")
      .populate("user", "name")
      .sort({ createdAt: -1 });

    
    const groupedComments = {};

    comments.forEach(comment => {
      const blogId = comment.blog._id.toString();

      if (!groupedComments[blogId]) {
        groupedComments[blogId] = {
          blogTitle: comment.blog.title,
          comments: [],
        };
      }

      groupedComments[blogId].comments.push(comment);
    });

    res.json({ success: true, comments: groupedComments });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID: ", userId);

    
    const [recentBlogs, blogs, comments, drafts, user] = await Promise.all([
      Blog.find({ author: userId })
        .sort({ createdAt: -1 })
        .limit(5),

      Blog.countDocuments({ author: userId }),

      Comment.countDocuments(), // (you may want to filter this later)

      Blog.countDocuments({ author: userId, isPublished: false }),

    
     User.findById(userId).populate("followers", "name email").populate("following", "name email").select("followers following")]);

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
      followers: user.followers,
      following: user.following
    };

    res.json({ success: true, dashboardData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message:"Comment deleted successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}

export const approveCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message:"Comment approved successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}  
export const getSavedBlogs = async (req, res) => {
  try {
    const userId = req.user.id; // coming from auth middleware
   
    const user = await User.findById(userId)
      .populate("savedBlogs") // populate blog details
      .select("savedBlogs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      blogs: user.savedBlogs,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const followUser = async (req, res) => {
  try {
    const userId = req.user.id;        
    const targetUserId = req.params.id;  

    
    if (userId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   
    if (user.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    await createFollowNotification({ recipientId:targetUserId,senderId:userId })

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetUserId = req.params.id;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    if (!user.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

   
    user.following = user.following.filter(
      id => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      id => id.toString() !== userId
    );

    await user.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const checkFollowStatus = async (req, res) => {
  try {
    const userId = req.user.id;          
    const targetUserId = req.params.id;  

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "Target user ID is required",
      });
    }

    const user = await User.findById(userId).select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = user.following.some(
      (id) => id.toString() === targetUserId
    );

    res.status(200).json({
      success: true,
      isFollowing,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

   
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

   
    const blog = await Blog.findById(comment.blog);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

   
    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    
    await Comment.findByIdAndDelete(commentId);

   
    await Comment.deleteMany({ parentComment: commentId });

    res.status(200).json({
      success: true,
      message: "Comment and replies deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 



export const toggleCommentStatus = async (req, res) => {
  try {
    const { commentId } = req.params;
   
    const userId = req.user.id;
  
    
    const comment = await Comment.findById(commentId).populate("blog", "author");

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    
    if (comment.blog.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this comment",
      });
    }

    
    comment.isApproved = !comment.isApproved;
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment status updated",
      isApproved: comment.isApproved,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};