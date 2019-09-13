let mongoose = require('mongoose'),
    User     = require('../models/users');

    let postSchema = new mongoose.Schema({
        title: String,
        content: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            username: String
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
        ,
        created: {type: Date, default: Date.now}   
    });
    let Post = mongoose.model('Post',postSchema);
    module.exports = Post;
  