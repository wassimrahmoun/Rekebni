const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get(
  "/search",
  trajetController.setTrajetUserIds,
  trajetController.searchTrajets
);

router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.protect, trajetController.createTrajet);

module.exports = router;
