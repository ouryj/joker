let express = require('express'),
    router  = express.Router(),
    Post    = require('../models/posts'),
    User    = require('../models/users'),
    middleFunc = require('../middleware/index');

    router.get('/post',(req,res)=>{
        Post.find({},(err,posts)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/posts/index',{posts: posts});
            }
        })
    })
    //new route
    router.get('/post/new',middleFunc.Auth,(req,res)=>{
        res.render('../views/posts/new');
    })
    //create post route
    router.post('/post',middleFunc.Auth,(req,res)=>{
        let author = {
            id: req.user._id,
            username: req.user.username
        }
        let title = req.body.title,
            content = req.body.content;
        let newPost = {title: title, content: content, author: author};
        Post.create( newPost,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else {
                res.redirect('/post');
            }
        })
        
   
    })
    //show route
    router.get('/post/:id',middleFunc.Auth,(req,res)=>{
        Post.findById(req.params.id).populate('comments').exec((err,post)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/posts/show',{post: post});
            }
        })
    })
    // edit route
    router.get('/post/:id/edit',middleFunc.checkPostOwner,(req,res)=>{
        Post.findById(req.params.id,(err,post)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/posts/edit',{post:post});
            }
        })
    })
    //update route
    router.put('/post/:id',middleFunc.checkPostOwner,(req,res)=>{
        Post.findByIdAndUpdate(req.params.id,req.body.post,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/post/'+req.params.id);
            }
        })
    })
    //delete route
    router.delete('/post/:id',middleFunc.checkPostOwner,(req,res)=>{
        Post.findByIdAndRemove(req.params.id,(err)=>{
            if(err){
                res.redirect('back');

            }else{
                res.redirect('/post');
            }
        })
    })


    module.exports = router;