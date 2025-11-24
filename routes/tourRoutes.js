const express = require("express");
const { checkID } = require("./../controllers/routeController-file");
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
} = require("./../controllers/routeController-db");

const router = express.Router();

router.param("id", checkID);
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
