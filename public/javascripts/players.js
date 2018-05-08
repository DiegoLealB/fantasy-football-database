const Player        = require('../../models/player')
const express       = require("express");
const axios         = require('axios');
const btoa          = require('btoa');


axios({
  type: 'GET',
  url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB,RB,WR,TE,K",
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa('diegolealb:3478561a')
  }
})
.then(response => {
  const allPlayers = [];
  allPlayers.push(response.data.cumulativeplayerstats);
  var playersArr = allPlayers[0].playerstatsentry;
  console.log(playersArr[0].stats);
  
  playersArr.forEach(player => {
    const newPlayer = Player({
      ID: player.ID,
      name: player.FirstName + " " + player.LastName,
      position: player.Position,
      jerseyNumber: player.JerseyNumber,
      team: team.Name, 
      fumbles: stats.Fumbles['#text'], 
      passAttempts: stats.PassAttempts['#text'],
      passAvg: stats.PassAvg['#text'],
      passCompletions: stats.PassCompletions['#text'],
      passInt: stats.PassInt['#text'],
      passTD: stats.PassTD['#text'],
      QBRating: stats.QBRating['#text'],
      recTD: stats.RecTD['#text'],
      recYards: stats.RecYards['#text'],
      receptions: stats.Receptions['#text'],
      rushAttempts: stats.RushAttempts['#text'],
      rushTD: stats.RushTD['#text'],
      rushYards: stats.RushTD['#text'],
      twoPtMade: stats.TwoPtMade['#text']
    })
    newPlayer.save((err) => {
      if (err) {
        res.render('dashboard', { message: "Sorry, something went wrong"})
      } else {
        res.redirect("/dash");
      }
    });
  });

  })
.catch(err => {console.log(err)})