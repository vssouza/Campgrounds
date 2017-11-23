var Campground = require('../models/campground');

module.exports = function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground) {
                req.flash("error", "Campground not found!");
                return res.redirect("/campgrounds");
            }
            else {
                // The foundCampground.author.id is a mongo object and req.user._id 
                // is a string so we have to take care with this
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();        
                }
                else {
                    req.flash("error", "You don't have permission to edit this Campground!");
                    return res.redirect("/campgrounds/" + foundCampground._id);
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in to edit Campgrounds!")
        return res.redirect("/login");
    }
}