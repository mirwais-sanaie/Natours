const mongoose = require("mongoose");

// 1 - create a schema
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "A tour must have a rating"],
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

// 2 - create a model
const Tour = mongoose.model("Tour", toursSchema);

// 3 - export
module.exports = Tour;
