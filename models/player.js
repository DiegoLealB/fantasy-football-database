const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const playerSchema = new Schema({
  ID: String,
  name: String,
  position: String,
  jerseyNumber: String,
  stats: Object
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;


// gamesPlayed: String,
// fumbles: String,
// passAttempts: String,
// passAvg: String,
// passCompletions: String,
// passInt: String,
// passTD: String,
// QBRating: String,
// recTD: String,
// recYards: String,
// receptions: String,
// rushAttempts: String,
// rushTD: String,
// rushYards: String,
// twoPtMade: String