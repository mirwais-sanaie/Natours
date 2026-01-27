const Tour = require("./../models/tourModel");

const catchAsync = require("../utils/catchAsync");
const handleFactory = require("./handleFactory");

exports.aliasTopTours = function (req, res, next) {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = handleFactory.getAll(Tour);

exports.getTour = handleFactory.getOne(Tour, { path: "reviews" });

exports.createTour = handleFactory.createOne(Tour);
exports.updateTour = handleFactory.updateOne(Tour);

exports.deleteTour = handleFactory.deleteOne(Tour);

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
