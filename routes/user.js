let express = require('express'),
    router  = express.Router(),
    middleFunc = require('../middleware/index')
    User    = require('../models/users');

    router.get('/',(req,res)=>{
        res.render('../views/home');
    })
    // register route
    router.get('/register',(req,res)=>{
        res.render('../views/users/register');
    })
   
    // register create route
    router.post('/register',(req,res)=>{
        let newUser = new User({name: req.body.name, age: req.body.age, image: req.body.image,
          username: req.body.username});
          User.register(newUser,req.body.password,(err,user)=>{
              if(err){
                  console.log(err);
                  res.redirect('back')
              }else{
                  req.flash('success','thanks for registering');
                  passport.authenticate('local')(req,res,()=>{
                      res.redirect('/post');
                  })
              }
          })
    })
     //login get route
     router.get('/login',(req,res)=>{
        res.render('../views/users/login');
    })
    //login post route
    router.post('/login',passport.authenticate('local',{
        successRedirect: '/post',
        failureRedirect: '/login'
    }),(req,res)=>{
        
    })
    //logout route
    router.get('/logout',(req,res)=>{
        req.logOut();
        req.flash('success', 'you are successfully log out');
        res.redirect('/');
        
    })
    // profile route
    router.get('/user/:id',middleFunc.Auth,(req,res)=>{
        User.findById(req.params.id,(err,user)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/users/profile',{user:user});
            }
        })
    })
    //delete account route
    router.delete('/user/:id',(req,res)=>{
       User.findByIdAndDelete(req.params.id,(err)=>{
           if(err){
               req.flash('error',err.message);
               res.redirect('back');
           }else {
               res.redirect('/post');
           }
       })
    })

    module.exports = router;