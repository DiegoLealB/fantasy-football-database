const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const teamSchema = new Schema({
  Username: String,
  QB: {type: String},
  RB1: {type: String},
  RB2: {type: String},
  WR1: {type: String},
  WR2: {type: String},
  TE: {type: String},
  K: {type: String},
  FLEX: {type: String},
  isOwner: {type: Boolean, default: false}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;