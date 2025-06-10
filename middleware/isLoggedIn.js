const isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to do this");
        console.log(res.locals.redirectUrl);
        return res.redirect("/login");
      }
      next();
}

module.exports = isLoggedIn;