const express        = require("express");
const router         = express.Router();
const User           = require("../models/user");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin    = require("connect-ensure-login");
const passport       = require("passport");

router.get("/signup", (req, res, next) => {
  res.render("index");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const first    = req.body.first;
  const last     = req.body.last;

  if (username === "") {
    res.render("index", { message: "Enter a username" });
    return;
  }
  if (password === "") {
    res.render('index', {message: "Enter a password"});
    return;
  }
  if (first === "") {
    res.render('index', {message: "Please enter your first name"});
    return;
  }
  if (last === "") {
    res.render('index', {message: "Please enter your last name"});
    return;
  }
  
  User.findOne({ "username": username },
  "username",
  (err, user) => {
    if (user !== null) {
      res.render("index", {
        message: "This username already exists"
      });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = User({
      username,
      password: hashPass,
      first,
      last,
    });
    
    newUser.save((err) => {
      if (err) {
        res.render('index', { message: "Sorry, something went wrong"})
      } else {
        res.redirect("/dash");
      }
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("login"
  );
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dash",
  failureRedirect: "/login",
  failureFlash: "Invalid username or password",
  passReqToCallback: true,
}));

router.get("/dash", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get('/player/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('player', { user: req.user })
});

router.get('/players/search', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const searchTerm = req.query.playerSearchBar;
  if (!searchTerm){
    res.render('no-search-view.hbs', { user: req.user });
    return;
  }
  const searchRegex = new RegExp(searchTerm, 'i');
})


 module.exports = router;