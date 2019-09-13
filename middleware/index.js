let Post = require('../models/posts'),
    Comment = require('../models/comments');


let middleFunc = {};

// user control logic
middleFunc.Auth = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash('error','you need to be loggedin first');
        res.redirect('/login');
    }
}
//post ownership logic
middleFunc.checkPostOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id,(err,post)=>{
            if(err){
                console.log(err);
                req.flash('error','post not found');
                res.redirect('back');
            }else{
                if(post.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash('error','permission denied');
                    res.redirect('back');
                }
            }
        })
    }else{
        req.flash('error','you need to sign in first');
        res.redirect('/login');
    }
}
// comment ownership logic
middleFunc.checkCommentOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,comment)=>{
            if(err){
                req.flash('error','comment not found');
                res.redirect('back');
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error','permission denied');
                    res.redirect('back');
                }
            }
        })
    }else{
        req.flash('error','please sign in first');
        res.redirect('/login');
    }
}
module.exports = middleFunc;