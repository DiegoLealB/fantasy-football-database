const express        = require("express");
const router         = express.Router();
const Player         = require("../models/player");
const User           = require("../models/user");
const Team           = require("../models/team")
const ensureLogin    = require("connect-ensure-login"); 
const passport       = require("passport");
const mongoose       = require("mongoose");
const Schema         = mongoose.Schema;
var favoritesArr     = [];



router.get("/dash", ensureLogin.ensureLoggedIn(), (req, res) => {
  favoritesArr = [];
  if (req.user.favorites.length > 0) {
    req.user.favorites.forEach(function(favorite) {
      Player.findOne({PlayerID: favorite})
      .then(player => {
        if(player !== null){
          favoritesArr.push(player.FirstName + " " + player.LastName);
        }
          res.render("dashboard", { 
            user: req.user,
            favorites: favoritesArr
          });
      })
      .catch(err => {console.log("/dash route error: ", err)})
    })
  } else {
    res.render("dashboard", {user: req.user})
  }
});

router.post('/player/favorite/:id', (req, res, next) =>{
  const playerId = req.params.id;
    Player.findOne({PlayerID:playerId})
  .then(foundPlayer => {
    req.user.favorites.push(foundPlayer.PlayerID);
    req.user.save()
    .then((user) => {
      console.log("saved user is: ", user)
      res.redirect('/dash')
    })
  })
})

  
router.get('/player/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {

  Player.findOne({PlayerID: req.params.id}, (err, player) => {
    res.render('player', {
      user: req.user,
      player: player,
    })
  })
});

router.get('/players/search', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const searchTerm = req.query.playerSearchBar;
  if (!searchTerm){
    res.render('no-search-view', { user: req.user });
    return;
  }
  const searchRegex = new RegExp(searchTerm, 'i');
  Player.find(
    { $or: [ {'FirstName': searchRegex}, {'LastName': searchRegex} ] },
    (err, searchResults) => {
      if(err){
        next(err);
        return;
      }
      res.render('search', {results: searchResults, user: req.user});
    }
  )
})

router.get('/team', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Team.find()
  .then(teams => {
    let data = {};
    data.list = teams;
    teams.forEach((team) => {
      for (let i = 0; i < req.user.teams.length; i++){
        if(team.Username === req.user.username){
          team.isOwner = true;
        }
      }
    })
    res.render('team', { list: teams, user: req.user } )
  })
  .catch(err => {console.log(err)})
  })

router.get('/team/find/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Team.findById(req.params.id)
  .then(teams => {
    let data = {};
    data.team = teams;
    res.render('show-team', {user: req.user, data})
  })
})

router.get('/team/new', ensureLogin.ensureLoggedIn() ,function(req, res) {
  res.render('new-team', {user: req.user} )
})

router.post('/team/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log(req.body)
  const newTeam = new Team({
      Username: req.user.username,
      QB: req.body.QB,
      RB1: req.body.RB1,
      RB2: req.body.RB2,
      WR1: req.body.WR1,
      WR2: req.body.WR2,
      TE: req.body.TE,
      FLEX: req.body.FLEX,
      K: req.body.K,
      isOwner: false
    })
  newTeam.save()
  User.findById(req.user._id)
  .then(user => {
    newTeam.isOwner = true;
    user.teams.push(newTeam);
    user.save()
    res.redirect('/team')
  })
  .catch(err => {console.log(err)})
})

router.get('/team/edit/:id', (req, res, next) => {
  Team.findById(req.params.id)
  .then(team => {
    res.render('edit-team', {team: team, user: req.user})
  })
})

router.post('/team/update/:id',ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Team.findById(req.params.id)
  .then(teamFromDb => {
    teamFromDb.QB = req.body.QB;
    teamFromDb.RB1 = req.body.RB1;
    teamFromDb.RB2 = req.body.RB2;
    teamFromDb.WR1 = req.body.WR1;
    teamFromDb.WR2 = req.body.WR2;
    teamFromDb.TE = req.body.TE;
    teamFromDb.FLEX = req.body.FLEX;
    teamFromDb.K = req.body.K;
    teamFromDb.save()
      .then(() => {
        res.redirect('/team')
      })
      .catch(err => {
        console.log("Err while saving update: ", err);
      })
     

  .catch( err => {
    console.log("Error while getting the team from DB: ", err)
  })
  })
})

router.post('/team/delete/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log("team id: ",req.params.id)
  Team.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('/team')
  })
  .catch( error => {
      console.log("Error while deleting: ", error)
  })
})

module.exports = router;