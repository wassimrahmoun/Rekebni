const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const reviewController = require("./../controllers/reviewController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.delete("/deleteMe", userController.deleteMe);
router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

router
  .route("/:conducteurId/reviews")
  .post(authController.protect, reviewController.createReview);

module.exports = router;
