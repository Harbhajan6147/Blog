import express from "express";
import { approveCommentById, checkFollowStatus, deleteCommentById, followUser, getAllBlogsAdmin, getDashboard, getSavedBlogs, unfollowUser, getCommentsOnMyBlogs, toggleCommentStatus, deleteComment} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();



adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get('/saved-blogs', auth, getSavedBlogs);
adminRouter.post('/follow-user/:id', auth, followUser);
adminRouter.post('/unfollow-user/:id', auth, unfollowUser);
adminRouter.get('/check-follow/:id', auth, checkFollowStatus);
adminRouter.get('/get-allComment-myBlog', auth, getCommentsOnMyBlogs);
adminRouter.patch('/toggle-status/:commentId',auth,toggleCommentStatus);
adminRouter.delete('/delete/:commentId',auth,deleteComment);



    
export default adminRouter;