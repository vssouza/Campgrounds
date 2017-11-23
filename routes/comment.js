var express = require("express"),
    Comment = require('../models/comment'),
    isLoggedIn = require("../middlewares/checkLoggedIn"),
    checkCommentOwnership = require("../middlewares/checkCommentOwnership"),
    Campground = require('../models/campground');

// allows it to receive url params when using routers
var router = express.Router({mergeParams: true});

router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "There was an error loading the selected Campground!");
            res.redirect("/campgrounds");
            console.log(err);
        }
        res.render("comments/new", {campground: campground});
    });
});

router.post("/", function(req, res){
    Campground.findById(req.params.id, function (err, campground) {
        if(err || !campground) {
            req.flash("error", "We couldn't find the specified Campground!")
            res.redirect("/campgrounds")
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong and we couldn't add your comment!")
                    res.redirect("/campgrounds/" + campground._id);
                }
                else {
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Your comment was successfully created!")
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Show edit comment form
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err || !foundCampground) {
           req.flash("error", "Couldn't find the specified Campground for the selected comment!")
           return res.redirect("/campgrounds");
           
       } else {
           Comment.findById(req.params.comment_id, function(err, selectedComment) {
                if(err || !selectedComment){
                    req.flash("error", "We couldn't find the specified comment!")
                    return res.redirect("/campgrounds/" + foundCampground._id);
                }
                else {
                    res.render("comments/edit", {campground_id: req.params.id, comment: selectedComment});
                }
            });
        }
    });
});

// Updates the comment
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err || !updatedComment){
            req.flash("error", "There was an error updating the selected comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
        req.flash("success", "Comment updated successfully!");
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
        if(err || !deletedComment){
            req.flash("error", "There was an error removing the selected comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
        req.flash("success", "Comment removed successfully!");
        res.redirect("/campgrounds/" + req.params.id);
    });
});


module.exports = router;