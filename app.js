if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError.js');
const {listingSchema, reviewSchema} = require('./joiSchema.js');
const listingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./model/user.js");


const store = MongoStore.create({
  mongoUrl : process.env.ATLASDB_URL,
  crypto : {
    secret : process.env.SECRET
  },
  touchAfter : 24*60*60
})

store.on('error',(err)=>{
  console.log("Error in session store ", err);
})

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires : Date.now() + 7 * 24 * 60 * 60 * 100,
    maxAge : 7 * 24 * 60 * 60 * 100 ,
    httpOnly : true
  }
}



app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

const port = 8080;


//middle ware to flash the success message with the help of npm package -- connect-flash
app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
})


//setup mongoDb connections 
main()
  .then(() => {
    console.log("Connected To Mongo Database Successfully");
  })
  .catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

///---------Routes ------------------
app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);


//home - root
// app.get("/", (req, res) => {
//   res.send("This is the root page of the website");
// })

// Other Routes
app.all(/(.*)/ , (req, res, next)=>{
  next(new expressError(404, "page Not Found"));
})


//error - middleware
app.use((err, req, res, next) => {
  let {message="Something Went Wrong !", statusCode=400} = err;
  res.status(statusCode).render("error.ejs", {err});
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
