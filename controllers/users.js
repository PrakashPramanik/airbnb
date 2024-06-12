const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
}
module.exports.signup = async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash("success", "Welcome to WANDERLUST");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/register");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
}

module.exports.login = async(req,res)=>{
    req.flash("success", "welcome back");
    let redirectURL = res.locals.redirectURL || "/listings";
    res.redirect(redirectURL);
}
module.exports.logout = (req,res,next)=>{
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out");
        res.redirect("/listings");
    });
    
}