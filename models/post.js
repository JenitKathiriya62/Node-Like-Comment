const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // Array of comments on the post
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
