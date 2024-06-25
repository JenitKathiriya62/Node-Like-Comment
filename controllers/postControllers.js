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

const pagination = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const posts = await Post.find()
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .sort({ createdAt: -1 })
                                .exec();

       return res.json(posts);
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server error' });
    }
}


// Endpoint for fetching posts by a specific user
const userPost = async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const posts = await Post.find({ user: userId })
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .sort({ createdAt: -1 })
                                .exec();

       return res.json(posts);
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server error' });
    }
};




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

        const index = post.likes.indexOf(userId);

        if (index === -1) {
            // User hasn't liked the post, so like it
            post.likes.push(userId);
        } else {
            // User has already liked the post, so unlike it
            post.likes.splice(index, 1);
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


const detailsPost = async (req, res) => {
    const postId = req.params.postId;

    try {
        // Find the post
        const post = await Post.findById(postId).populate('user').populate('comments').exec();

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find likes for the post
        const likes = await User.find({ _id: { $in: post.likes } });

        // Construct full post details object
        const fullPostDetails = {
            _id: post._id,
            user: post.user,
            content: post.content,
            likes: likes,
            comments: post.comments,
            createdAt: post.createdAt,
        };

       return res.json(fullPostDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    addpost,
    likepost,
    commentpost,
    pagination,
    userPost,
    detailsPost,
  };
  