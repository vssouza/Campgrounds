var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose', {useMongoClient: true}),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    flash = require('connect-flash'),
    User = require('./models/user'),
    seedDB = require('./seeds'),
    app = express();
    
var commentRoutes = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise; 

//seedDB();

app.use(require('express-session')({
    secret: "Harley is the best pet in the world", // this should be provided by a docker secret key
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// setup passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
// express-sanitizer must goes after body-parser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// responsible for reading the session, encoding and deserializing session data
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

// we add the user variable to every route
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Import our routes with prefixes to make route files cleaner
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// Open mongodb connection
mongoose.connect('mongodb://localhost/yelpcamp', { useMongoClient: true });

// starts our app in C9
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp listening on port " + process.env.PORT);
});