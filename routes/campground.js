
var express = require("express"),
    checkCampgroundOwnership = require("../middlewares/checkCampgroundOwnership"),
    isLoggedIn = require("../middlewares/checkLoggedIn"),
    Campground = require('../models/campground');

var router = express.Router();

// Show the campground add form
router.get("/new", isLoggedIn, function(req, res){
    return res.render("campgrounds/new");
});

// Show campground details
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground) {
            req.flash("error", "There was an error loading the selected Campground!");
            return res.redirect("/campgrounds");
        }
        return res.render("campgrounds/show", {campground: foundCampground});
    });
});

// Display form to edit a campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, selectedCampground){
        return res.render("campgrounds/edit", {campground: selectedCampground});        
    });
});

// Remove a campground
// to send delete from browser use ?_method=DELETE after installing method-override module
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        return res.redirect("/campgrounds");
    });
    
});

// Update a campground
router.put("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        //redirect uses GET by default (if using render instead of this would try to send as PUT)
        return res.redirect("/campgrounds/" + updatedCampground._id);
    });
});

// Create a new campground
router.post("/", isLoggedIn, function(req, res){
    // sanitize data so we do not have injection problems
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    req.body.campground.author = author;
    Campground.create(
        req.body.campground,
        function(err, campground){
            if(err){
                req.flash("error", "You need to be logged in to add Campgrounds!");
                return res.redirect("campgrounds/new", {error: err});
            }
            req.flash("success", "Campground successfully added!")
            return res.redirect("/campgrounds");
        }
    );
});

module.exports = router;