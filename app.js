var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");
var methodOverride = require("method-override");
var seedDB      = require("./seeds");
    
//requring routes
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index");

mongoose.connect("mongodb+srv://mdnzn04:<nizloman04>@yelpcamp.xm0xs.mongodb.net/<dbname>?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


var  port = process.env.PORT || 2000;
app.listen(port,function(){
    console.log("YelpCAmp Started")
});