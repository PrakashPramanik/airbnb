const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const {listingSchema, reviewSchema} = require("./schema");
const Review = require("./models/review");
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "Please Login First");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectURL = (req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error","You don't have permission to edit");
    return res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error","You don't have permission to delete");
    return res.redirect(`/listings/${id}`);
   }
   next();
}