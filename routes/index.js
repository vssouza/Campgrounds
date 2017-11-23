var User = require('../models/user'),
    passport = require('passport'),
    express = require("express"),
    Campground = require('../models/campground');

var router = express.Router();

router.get("/", function(req, res) {
    res.render("landing");
});

// Auth routes
router.get("/register", function(req, res){
    // show signup form
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            // we do tihs in case of error
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username +"!");
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}), function(req, res){ });

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You were logged out!");
    res.redirect("/campgrounds");
});

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgroundList){
        if(err){
            req.flash("error", "We couldn't do anything. Looks like the robots went out for a coffee!");
            res.redirect("/");
        }
        res.render("campgrounds/index", {campgrounds: campgroundList});
    });

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;