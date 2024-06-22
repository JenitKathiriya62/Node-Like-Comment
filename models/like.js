const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [{
        name: {
            type: String,
            required: true
        }
    }]
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
