var Comment = require('../models/comment');

module.exports = function checkCommentOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment) {
                req.flash("error", "Couldn't find the specified comment!");
                return res.redirect("/campgrounds/" + req.params.id);
            }
            else {
                // The foundCampground.author.id is a mongo object and req.user._id 
                // is a string so we have to take care with this
                if(foundComment.author.id.equals(req.user._id)) {
                    next();        
                }
                else {
                    req.flash("error", "You do not have permission to edit this comment!")
                    //takes the user back to the previous page he came from
                    return res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged edit comments!")
        return res.redirect("/login");
    }
}