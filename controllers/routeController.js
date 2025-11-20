const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);

  if (val * 1 > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
    return;
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    success: true,
    results: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    success: true,
    data: tour,
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        success: true,
        data: newTour,
      });
    }
  );

  res.status(201).json({
    success: true,
    message: "Done",
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update tour here...",
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
