const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), getAllUsers)
  .post(authController.protect, authController.restrictTo("admin"), createUser);
router
  .route("/:id")
  .get(authController.protect, authController.restrictTo("admin"), getUser)
  .patch(authController.protect, authController.restrictTo("admin"), updateUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    deleteUser
  );

module.exports = router;
