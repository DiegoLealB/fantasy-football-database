const Player        = require('../../models/player')
const express       = require("express");
const axios         = require('axios');
const btoa          = require('btoa');
const mongoose      = require('mongoose');

axios({
  type: 'GET',
  url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB,RB,WR,TE,K",
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(process.env.username + ":" + process.env.password)
  }
})
.then(response => {
  var playerStats = response.data.cumulativeplayerstats;
  console.log(playerStats.playerstatsentry[0].stats)
  
  for (let i = 0; i < playerStats.playerstatsentry.length; i++) {
    // console.log(playerStats.playerstatsentry[i].player.ID)
    const newPlayer = Player({
      ID: playerStats.playerstatsentry[i].player.ID,
      name: playerStats.playerstatsentry[i].player.FirstName + " "
      + playerStats.playerstatsentry[i].player.LastName,
      position: playerStats.playerstatsentry[i].player.Position,
      jerseyNumber: playerStats.playerstatsentry[i].player.JerseyNumber,
      stats: playerStats.playerstatsentry[i].stats
    }) // Add team
    newPlayer.save((err) => {
      if (err) {
        res.render('dashboard', { message: "Sorry, something went wrong"})
      } else {
        res.redirect("/dash");
      }
    });
  }
})
.catch(err => {console.log(err)})


// fumbles: playerStats.playerstatsentry[i].stats.Fumbles.text, 
// passAttempts: playerStats.playerstatsentry[i].stats.PassAttempts.text,
// passAvg: playerStats.playerstatsentry[i].stats.PassAvg.text,
// passCompletions: playerStats.playerstatsentry[i].stats.PassCompletions.text,
// passInt: playerStats.playerstatsentry[i].stats.PassInt['#text'],
// passTD: playerStats.playerstatsentry[i].stats.PassTD['#text'],
// QBRating: playerStats.playerstatsentry[i].stats.QBRating['#text'],
// recTD: playerStats.playerstatsentry[i].stats.RecTD['#text'],
// recYards: playerStats.playerstatsentry[i].stats.RecYards['#text'],
// receptions: playerStats.playerstatsentry[i].stats.Receptions['#text'],
// rushAttempts: playerStats.playerstatsentry[i].stats.RushAttempts['#text'],
// rushTD: playerStats.playerstatsentry[i].stats.RushTD['#text'],
// rushYards: playerStats.playerstatsentry[i].stats.RushTD['#text'],
// twoPtMade: playerStats.playerstatsentry[i].stats.TwoPtMade['#text']