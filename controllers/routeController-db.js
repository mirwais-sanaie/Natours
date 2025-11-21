const Tour = require("./../models/tourModel");

exports.getAllTours = async function (req, res) {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async function (req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTour = async function (req, res) {
  //save to db
  const newTour = await Tour.create(req.body);

  //response send to client
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
