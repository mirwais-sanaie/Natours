const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("./../utils/apiError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError("No doc found With that ID to delete!", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No doc found With that ID to update!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No doc found With that ID!", 404));
    }
    res.status(200).json({
      status: "success",
      data: { doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async function (req, res, next) {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

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
