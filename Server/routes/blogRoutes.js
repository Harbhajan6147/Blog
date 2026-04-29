import express from "express";
import { addBlog, addComment, deleteBlogById,getReplies, generateContent,allBlogbyAuthor,getAllBlogs,  getAllUserBlogs, getBlogById, getBlogComments, handleDislike, handleLike, togglePublish, toggleSaveBlog, getNotifications, markAllAsRead, hasUnreadNotifications, generateDescription } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";


const blogRouter = express.Router();

blogRouter.get('/all-notifications',auth,getNotifications)
blogRouter.put('/read-all-notifications',auth,markAllAsRead);
blogRouter.get('/check-unread', auth, hasUnreadNotifications);

blogRouter.post('/generate-description', auth, generateDescription);

blogRouter.post("/add", auth, upload.single('image'), addBlog);
blogRouter.get('/all',auth, getAllUserBlogs);
blogRouter.get('/allBlogs', getAllBlogs);

blogRouter.get('/getReplies/:commentId',getReplies);

blogRouter.delete('/delete/:blogId', auth, deleteBlogById);
blogRouter.patch('/toggle-publish/:blogId', auth, togglePublish);
blogRouter.post('/add-comment',auth,  addComment);
blogRouter.get('/getBlogComments/:blogId', getBlogComments);

blogRouter.post('/generate', auth, generateContent);
blogRouter.post('/toggle-save/:blogId', auth, toggleSaveBlog);

blogRouter.post('/toggle-like/:blogId', auth, handleLike);
blogRouter.post('/toggle-dislike/:blogId', auth, handleDislike);
blogRouter.get('/all/:authorId',allBlogbyAuthor);
blogRouter.get('/:blogId',auth, getBlogById);




export default blogRouter;