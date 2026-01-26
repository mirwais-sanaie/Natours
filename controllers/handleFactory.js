const catchAsync = require("../utils/catchAsync");

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
