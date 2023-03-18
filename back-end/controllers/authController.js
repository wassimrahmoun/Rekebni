const crypto = require("crypto");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions); // for security to not brawser modif the cookie hehe chui trop fort ;

  //to not show password when we create new user
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    date: {
      user: user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //1) check if email and pass exist
  if (!email || !password) {
    return next(new AppError("Please provide mail ajd password!", 400)); //always return
  }

  //2) chesk if user existes && password is correct
  const user = await User.findOne({ email: email }).select("+password"); //+password because password fdont apire in db

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  //3) tt ok send token to client
  createSendToken(user, 200, res);
});
