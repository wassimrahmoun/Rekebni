const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    require: [true, "Vous devez avoir un nom "],
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Entrez une address email valide "],
  },
  photo: {},
  role: {},
  password: {
    type: String,
    require: [true, "Vous devez avoir un mot de passe "],
    select: false, //Pour postmane
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Vous devez confirmer votre mot de passe"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      massage: "Cest pas le meme que votre mot de passe",
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// mdp crypter
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  //delet confirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.verifyPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
