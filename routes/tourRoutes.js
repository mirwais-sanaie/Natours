const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  checkID,
} = require("./../controllers/routeController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour);

module.exports = router;
