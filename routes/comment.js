let express = require('express'),
    router  = express.Router(),
    Post    = require('../models/posts'),
    Comment = require('../models/comments'),
    middleFunc = require('../middleware/index');

    //new route comments
    router.get('/post/:id/comments/new',middleFunc.Auth,(req,res)=>{
        Post.findById(req.params.id,(err,post)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/comments/new',{post:post});
            }
        })
        
    })
    //create comment route
    router.post('/post/:id/comments',middleFunc.Auth,(req,res)=>{
        Post.findById(req.params.id,(err,post)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                Comment.create(req.body.comment,(err,comment)=>{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/post/'+req.params.id);
                })
                
            }
        })
    })
    router.get('/post/:id/comments/:comment_id/edit',middleFunc.checkCommentOwner,(req,res)=>{
        Comment.findById(req.params.comment_id,(err,comment)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.render('../views/comments/edit',{post_id: req.params.id,comment:comment});
            }
        })
    })
    router.put('/post/:id/comments/:comment_id',middleFunc.checkCommentOwner,(req,res)=>{
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/post/'+req.params.id);
            }
        })
    })
    router.delete('/post/:id/comments/:comment_id',middleFunc.checkCommentOwner,(req,res)=>{
        Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
            if(err){
                console.log(err);
                res.redirect('/post');
            }else{
                res.redirect('/post/'+req.params.id);
            }
        })
    })


    module.exports = router;