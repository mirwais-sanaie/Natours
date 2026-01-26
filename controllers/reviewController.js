const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const handleFactory = require("./handleFactory");

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError("No review found With that ID!", 404));
  }
  res.status(200).json({
    status: "success",
    data: { review },
  });
});

exports.deleteReview = handleFactory.deleteOne(Review);

exports.updateReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const review = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError("No review found With that ID!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
