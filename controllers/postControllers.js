const Post = require('../models/post');
const User = require('../models/userModel');
const Comment = require('../models/comment');

const addpost = async(req,res)=>{

    const { userId, content } = req.body;
    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create new post
        const newPost = new Post({
            user: userId,
            content
        });

        const savedPost = await newPost.save();
      return res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }

}


const likepost = async(req,res)=>{
    const { userId } = req.body;
    const postId = req.params.postId;
    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "Post already liked by the user" });
        }

        // Add user to likes array and save the post
        post.likes.push(userId);
        await post.save();

        return res.json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


const commentpost = async(req,res)=>{
    const { userId, content } = req.body;
    const postId = req.params.postId;
    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Create new comment
        const newComment = new Comment({
            user: userId,
            post: postId,
            content
        });

        const savedComment = await newComment.save();

        // Add comment to the post's comments array and save the post
        post.comments.push(savedComment._id);
        await post.save();

        return res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}
module.exports = {
    addpost,
    likepost,
    commentpost,
  };
  