const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    department: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      expiresIn: Date.now() + 86400000,
    },
    "forms"
  );
};

module.exports = mongoose.model("user", userSchema);
