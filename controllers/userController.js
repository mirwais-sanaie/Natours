const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("No user found With that ID!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
};
exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found With that ID!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("No user found With that ID!", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
