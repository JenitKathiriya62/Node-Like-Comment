const express = require('express');
const router = express.Router();
const postController = require("../controllers/postControllers");



const auth = require("../middleware/auth");


// Route to create a new post
router.post('/addpost',auth, postController.addpost);

// Route to like a post
router.post('/:postId/like',auth, postController.likepost);

// Route to comment on a post
router.post('/:postId/comment',auth, postController.commentpost);

module.exports = router;
