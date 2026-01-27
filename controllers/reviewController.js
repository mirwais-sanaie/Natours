const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const handleFactory = require("./handleFactory");

exports.getAllReviews = handleFactory.getAll(Review);

exports.getReview = handleFactory.getOne(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = handleFactory.createOne(Review);

exports.deleteReview = handleFactory.deleteOne(Review);

exports.updateReview = handleFactory.updateOne(Review);
