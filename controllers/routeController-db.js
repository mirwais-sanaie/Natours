const ApiFeatures = require("../utils/apiFeatures");
const Tour = require("./../models/tourModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/apiError");

exports.aliasTopTours = function (req, res, next) {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = catchAsync(async function (req, res, next) {
  // EXECUTE QUERY
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();
  const tours = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async function (req, res, next) {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  if (!tour) {
    return next(new AppError("No tour found With that ID!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async function (req, res, next, next) {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: { tour: newTour },
  });
});

exports.updateTour = catchAsync(async function (req, res, next) {
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found With that ID to update!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async function (req, res, next) {
  const id = req.params.id;
  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    return next(new AppError("No tour found With that ID!", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getTourStats = catchAsync(async function (req, res, next) {
  const tours = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: {
          $lte: 5.5,
        },
      },
    },
    {
      $group: {
        _id: "$difficulty",
        countTours: {
          $sum: 1,
        },
        countRatings: {
          $sum: "$ratingsQuantity",
        },
      },
    },
    {
      $sort: {
        countRatings: -1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async function (req, res, next) {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
