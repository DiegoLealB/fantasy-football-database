const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const playerSchema = new Schema({
  PlayerID: Number,
  LastName: String,
  FirstName: String,
  JerseyNum: Number,
  Position: String,
  Height: String,
  Weight: Number,
  BirthDate: String,
  Age: Number,
  BirthCity: String,
  BirthCountry: String,
  Rookie: String,
  TeamID: Number,
  TeamAbbr: String,
  TeamCity: String,
  TeamName: String,
  GamesPlayed: {type: Number, default: ""},
  PassAttempts: {type: Number, default: ""},
  RushAttempts: {type: Number, default: ""},
  FgAtt: {type: Number, default: ""},
  XpAtt: {type: Number, default: ""},
  PassCompletions: {type: Number, default: ""},
  PassYards: {type: Number, default: ""},
  RushYards: {type: Number, default: ""},
  RecYards: {type: Number, default: ""},
  IntYds: {type: Number, default: ""},
  KrYds: {type: Number, default: ""},
  PrYds: {type: Number, default: ""},
  KoYds: {type: Number, default: ""},
  PuntYds: {type: Number, default: ""},
  PassTD: {type: Number, default: ""},
  RushTD: {type: Number, default: ""},
  RecTD: {type: Number, default: ""},
  IntTD: {type: Number, default: ""},
  FumTD: {type: Number, default: ""},
  KrTD: {type: Number, default: ""},
  PrTD: {type: Number, default: ""},
  KoTD: {type: Number, default: ""},
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;