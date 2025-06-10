const User = require('../model/user');

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.createNewUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username, });
        const registeredUser = await User.register(newUser, password);
        //automatically login after register
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User registerd successfully. Welcome to WanderLust");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}

//login
module.exports.loginUser = async (req, res)=>{
    try {
        req.flash("success", `Welcome ${req.body.username}, you are successfully logged in`);
        res.redirect(res.locals.redirectUrl || "/listings");
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/login");
    }
}

//logout 
module.exports.logoutUser = (req, res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Successfully logged out!")
        return res.redirect("/listings");
    })
}