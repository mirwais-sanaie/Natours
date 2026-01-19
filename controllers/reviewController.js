const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");

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
  const reviews = await Review.find();

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

exports.deleteReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    return next(new AppError("No review found With that ID to delete!", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

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
