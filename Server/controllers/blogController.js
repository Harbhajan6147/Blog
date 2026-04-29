import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { createInflateRaw } from 'zlib';
import { createNewBlogNotification } from '../Services.js';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";



export const addBlog = async (req, res)=>{
    try {
        const {title, subtitle, description, category, isPublished} = req.body;
        
        const image = req.file.path;
        const user= req.user.id;
        const  public_id= req.file.filename;
        
     
         
          const blog = await Blog.create({
      title,
      subTitle:subtitle,
      description,
      category,
      isPublished,
      author: user,
      image,
      public_id
    });
     
   await createNewBlogNotification({authorId: req.user.id,blogId: blog._id,});


    res.json({success: true, message: "Blog added successfully",data:blog})

    } catch (error) {
        console.log('yes');
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true}).sort({createdAt: -1}).populate('author', 'name');    
        return res.json({success: true, blogs})
      
    }
    catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const allBlogbyAuthor=  async (req, res) => {
  try {
     const { authorId } = req.params;

    const blogs = await Blog.find({ author: authorId })
      .populate("author", "name") 
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
      authorName: blogs.length > 0 ? blogs[0].author.name : null 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAllUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("author", "name");

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    let isSaved = false;
    let isLiked = false;
    let isDisLiked = false;

    
    const likesCount = blog.Liked.length;
    const dislikesCount = blog.Disliked.length;
         
    if (req.user) {
     
      const userId = req.user.id;



      const user = await User.findById(userId).select("savedBlogs");


       isSaved = user?.savedBlogs?.some(id => id.equals(blog._id)) || false;

      isLiked = blog.Liked?.some(id => id.equals(userId)) || false;

      isDisLiked = blog.Disliked?.some(id => id.equals(userId)) || false;
    }
 
    res.json({
      success: true,
      blog,
      isSaved,
      isLiked,
      isDisLiked,
      likesCount,
      dislikesCount
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteBlogById = async (req, res) =>{
    try {
        const { blogId } = req.params;
        
        await Blog.findByIdAndDelete(blogId);

        // Delete all comments associated with the blog
       

        res.json({success: true, message: 'Blog deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog status updated",
      blog, 
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogComments = async (req, res) =>{
    try {
        const {blogId } = req.params;
       const comments = await Comment.find({ blog: blogId,isApproved: true,parentComment:null})
           .populate("user", "name").sort({ createdAt: -1 });
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req, res)=>{
    try {
        const {prompt} = req.body;
        const content = await main.generateContent(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res) => {
  try {
    const { blog, parentComment, content } = req.body;
    const user = req.user.id;

  
   if ( !content) {
      return res.status(400).json({
        success: false,
        message: "Blog and content are required",
      });
    }
      if(parentComment){
       
        let parent = await Comment.findById(parentComment);
         console.log(parent);
       
      if (!parent) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }
      console.log(blog)
       const newComment = await Comment.create({
      blog,
      content,
      parentComment: parent ? parent._id : null,
      user 
    });
     
     return res.status(201).json({
      success: true,
      message: parent ? "Reply added successfully" : "Comment added successfully",
      comment: newComment,
    });

  
      }
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog and content are required",
      });
    }

    
    const blogExists = await Blog.findById(blog);
    if (!blogExists) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

   
    if (parentComment) {
      const parentExists = await Comment.findById(parentComment);
      if (!parentExists) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }
    }

    
    const newComment = new Comment({
      blog,
      user,
      content,
      parentComment: parentComment || null,
    });

    await newComment.save();

    await newComment.populate("user", "name");


    
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const toggleSaveBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.params;

    
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

   
    const user = await User.findById(userId);

    const isSaved = user.savedBlogs.includes(blogId);

    if (isSaved) {
      
      await User.findByIdAndUpdate(userId, {
        $pull: { savedBlogs: blogId },
      });

      return res.json({
        success: true,
        message: "Blog removed from saved",
        saved: false,
      });
    } else {
     
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedBlogs: blogId },
      });

      return res.json({
        success: true,
        message: "Blog saved successfully",
        saved: true,
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const handleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    // 🔹 Toggle remove like
    const removed = await Blog.findOneAndUpdate(
      { _id: blogId, Liked: userId },
      { $pull: { Liked: userId } },
      { new: true }
    );

    if (removed) {
      return res.json({
        success: true,
        isLiked: false,
        isDisLiked: false,
        likesCount: removed.Liked.length,
        dislikesCount: removed.Disliked.length,
        message: "Like removed"
      });
    }

    // 🔹 Add like & remove dislike
    const updated = await Blog.findByIdAndUpdate(
      blogId,
      {
        $addToSet: { Liked: userId },
        $pull: { Disliked: userId }
      },
      { new: true }
    );

    res.json({
      success: true,
      isLiked: true,
      isDisLiked: false,
      likesCount: updated.Liked.length,
      dislikesCount: updated.Disliked.length,
      message: "Blog liked"
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const handleDislike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    const removed = await Blog.findOneAndUpdate(
      { _id: blogId, Disliked: userId },
      { $pull: { Disliked: userId } },
      { new: true }
    );

    if (removed) {
      return res.json({
        success: true,
        isLiked: false,
        isDisLiked: false,
        likesCount: removed.Liked.length,
        dislikesCount: removed.Disliked.length,
        message: "Dislike removed"
      });
    }

    const updated = await Blog.findByIdAndUpdate(
      blogId,
      {
        $addToSet: { Disliked: userId },
        $pull: { Liked: userId }
      },
      { new: true }
    );

    res.json({
      success: true,
      isLiked: false,
      isDisLiked: true,
      likesCount: updated.Liked.length,
      dislikesCount: updated.Disliked.length,
      message: "Blog disliked"
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




export const getNotifications = async (req, res) => {
  
  try {
      
    const userId = req.user.id;
    

    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "name")
      .populate("blog", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });
  } catch (err) {

    res.json({ success: false, message: "Error fetching notifications" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
};



export const hasUnreadNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

  console.log("yes");
    const unreadExists = await Notification.exists({
      recipient: userId,
      isRead: false,
    });

    res.json({
      success: true,
      hasUnread: !!unreadExists, 
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error checking unread notifications",
    });
  }
};

export const getReplies= async(req,res)=>{
   try {
    const {commentId}= req.params;
    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }
const replies = await Comment.find({
      parentComment: commentId,
      isApproved: true
    })
      .populate("user", "name ") 
      .sort({ createdAt: -1 });

       return res.status(200).json({
      success: true,
      
      replies,
    });
   } catch (error) {
    
   }
 }


import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: 'sk-b6de8dc415c742dc9bfc1d6566d55712',
});

export const generateDescription = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const prompt = `
You are a professional blog writer and SEO expert.

Write a complete, high-quality blog post.

Title: ${title}

User Preferences:
${message || "No specific preference"}

STRICT REQUIREMENTS:
- MUST be at least 800–1200 words
- Strong hook introduction (NO generic openings)
- Clear headings (H2/H3)
- Short paragraphs
- Add examples and insights
- Conversational but professional tone
- Strong conclusion

SEO:
- Natural keyword usage
- No keyword stuffing

Blog Content:
`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a professional SEO blog writer." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000, // ✅ FIXED
      temperature: 0.7,
    });

    res.json({
      success: true,
      description: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("Description Error:", err.message);
    res.status(500).json({ error: "Failed to generate description" });
  }
};

// const llm = new ChatGoogleGenerativeAI({
 
//   apiKey: 'AIzaSyDaXzYISmRuaaFttiY9roPuQl1Z-I2EoKM', 
//   model: "gemini-2.0-flash", 
//   temperature: 0.7,
//   maxOutputTokens: 200,
// });


// const contentPrompt = PromptTemplate.fromTemplate(`
// You are a professional blog writer and SEO expert.

// Your task is to write a complete, high-quality blog post.

// Title: {title}

// User Preferences:
// {taste}

// STRICT REQUIREMENTS:
// - MUST be at least 800–1200 words
// - Write in a clear, engaging, and human-like tone
// - Start with a strong, attention-grabbing introduction (NO generic phrases like "Nowadays", "In today's world", etc.)
// - Make the intro directly relevant to the title and hook the reader

// STRUCTURE:
// 1. Introduction (hook + what reader will learn)
// 2. Main Sections with clear headings (H2/H3 style)
// 3. Use short paragraphs for readability
// 4. Include examples, explanations, or insights
// 5. Add a conversational tone where appropriate
// 6. End with a strong conclusion (summary + takeaway)

// ENGAGEMENT RULES:
// - Keep the reader curious throughout
// - Avoid fluff and repetition
// - Use simple, clear language (no unnecessary jargon)
// - Add value in every section

// SEO RULES:
// - Naturally include keywords based on the title
// - Do NOT keyword stuff
// - Make headings meaningful and search-friendly

// GOAL:
// The blog should feel like a real, valuable article that users would enjoy reading and sharing.

// Blog Content:
// `);

// const contentChain = RunnableSequence.from([
//   contentPrompt,
//   llm,
// ]);



//  export const generateDescription= async (req, res) => {
//    try {
   
//      const { title, message } = req.body;
       
//      if (!title || title.trim() === "") {
//        return res.status(400).json({ error: "Title is required" });
//      }

  
//     const result = await contentChain.invoke({
//    title,
//   taste: message || "No specific preference"
//  });

//    console.log(result.content);
//      res.json({
//       success: true,
//       description: result.content,
//     });

//   } catch (err) {
//     console.error("Description Error:", err.message);
//     res.status(500).json({ error: "Failed to generate description" });
//   } 
// }

// const reviewPrompt = PromptTemplate.fromTemplate(`
// You are an expert reviewer and editor.

// You are given:
// 1. The content title
// 2. The generated description
// 3. The user's preferences (tone/style)
// 4. The user's original review

// Your job is to improve the review while keeping it aligned with the context.

// Title:
// {title}

// Generated Description:
// {description}



// User Review:
// {review}

// Instructions:
// - Improve grammar and clarity
// - Make it more detailed and meaningful
// - Keep the original intent of the user
// - Align the tone with user preferences
// - Ensure the review is relevant to the title and description
// - Keep it natural and human-like

// Improved Review:
// `);


// const reviewChain = RunnableSequence.from([
//   reviewPrompt,
//   llm,
// ]);


// // app.post("/improve-review", async (req, res) => {
// //   try {
// //     const { review } = req.body;

// //     if (!review || review.trim() === "") {
// //       return res.status(400).json({ error: "Review is required" });
// //     }

// //     const result = await reviewChain.invoke({ review });

// //     res.json({
// //       success: true,
// //       improvedReview: result.content,
// //     });

// //   } catch (err) {
// //     console.error("Review Error:", err.message);
// //     res.status(500).json({ error: "Failed to improve review" });
// //   }
// // });





