let express         = require('express'),
    app             = express(),
    User            = require('./models/users');
    flash           = require('connect-flash'),
    Posts           = require('./models/posts'),
    Comment         = require('./models/comments')
    passport        = require('passport'),
    mongoose        = require('mongoose'),
    userRoute       = require('./routes/user'),
    postRoute       = require('./routes/post'),
    bodyParser      = require('body-parser'),
    commentRoute    = require('./routes/comment'),
    localPassport   = require('passport-local'),
    methodOverride  = require('method-override');

    // set up mongoose
    mongoose.connect("mongodb://localhost:27017/jokes_app",{useNewUrlParser:true});
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(methodOverride('_method'));
    app.use(flash());
    app.set('view engine','ejs');

    //passport config
    app.use(require('express-session')({
        secret: 'joker app',
        resave: false,
        saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new localPassport(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        app.use((req,res,next)=>{
            res.locals.currentUser = req.user;
            res.locals.error  = req.flash('error');
            res.locals.success = req.flash('success');
            next();
        })


        app.use(userRoute);
        app.use(postRoute);
        app.use(commentRoute);

  

      
    //boot up server
    app.listen(3000,()=>{
        console.log('jokes is poping on port 3000');
    })
  