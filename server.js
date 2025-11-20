const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

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

const Tour = mongoose.model("Tour", toursSchema);

const tour1 = new Tour({
  name: "Forest new",
  rating: 4.7,
  price: 497,
});
const tour2 = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 397,
});

tour1
  .save()
  .then((doc) => {
    console.log(doc, "Tour saved successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
