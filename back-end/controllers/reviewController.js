const Review = require("./../models/reviewModel");
// const catchAsync = require('./../utils/catchAsync');
const factory = require("./handlerFactory");

exports.setConducteurUserIds = (req, res, next) => {
  //allow neseted routes
  if (!req.body.conducteur) req.body.conducteur = req.params.conducteurId; //he can write the id of tour manualy or not if not we bring it from the req.params.tourId
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
