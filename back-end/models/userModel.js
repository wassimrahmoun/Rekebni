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
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
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

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000; //we do -1000ms to not have probleme if the new token come before this middleware

  next();
});

userSchema.pre(/^find/, function (next) {
  //this points to the corrents quatry
  this.find({ active: { $ne: false } }); // note equiale to false because if we do ! true the others dont have the active object
  next();
});

userSchema.methods.verifyPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min and it will expire

  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
