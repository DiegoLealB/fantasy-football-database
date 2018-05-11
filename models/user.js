const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  first: String,
  last: String,
  favorites: {type: [String], default: ""},
  teams: {type: []},
  isOwner: {type: Boolean, default: false}
},
{
  usePushEach: true
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;