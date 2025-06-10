const express = require('express');
const User = require('../model/user');
const app = express();
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const saveRedirectUrl = require('../middleware/saveRedirectUrl.js');
const { signupForm, createNewUser, loginForm, loginUser, logoutUser } = require('../controller/userController.js');

router.route("/signup").get(signupForm).post(wrapAsync(createNewUser));
router.route("/login").get(loginForm).post(saveRedirectUrl, passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}), wrapAsync(loginUser));
router.get("/logout", logoutUser);

module.exports = router