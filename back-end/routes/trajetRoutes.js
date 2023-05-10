const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.get(
//   "/:slug",
//   authController.protect,
//   trajetController.getUserTrajects
// );
router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.isLoggedIn, trajetController.createTrajet);

// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router.route("/:id").get(trajetController.getTrajet);

router.use(authController.protect);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
