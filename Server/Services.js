import User from "./models/User.js";
import Notification from "./models/Notification.js";

export const createFollowNotification = async ({
  recipientId,
  senderId,
}) => {
  if (recipientId.toString() === senderId.toString()) return;
   console.log("yes");
  return await Notification.create({
    recipient: recipientId,
    sender: senderId,
    type: "FOLLOW",
  });
};


export const createNewBlogNotification = async ({
  authorId,
  blogId,
}) => {
  
  const followers = await User.find({ following: authorId }).select("_id");

  if (!followers.length) return;

  const notifications = followers.map((f) => ({
    recipient: f._id,
    sender: authorId,
    type: "NEW_BLOG",
    blog: blogId,
  }));

  return await Notification.insertMany(notifications);
};