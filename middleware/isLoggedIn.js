const isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.originalUrl);
        req.flash("error", "Please login to do this");
        return res.redirect("/login");
      }
      next();
}

module.exports = isLoggedIn;