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

//Pagination post route
router.get('/api/posts',auth, postController.pagination);


//end point user post pagination route
router.get('/api/posts/user/:userId',auth, postController.userPost);

//full post details route
router.get('/api/posts/:postId',auth, postController.detailsPost);


module.exports = router;
