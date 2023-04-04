const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/search", trajetController.searchTrajets); //je pense c mieuc dutiliser li deja rak khademha get zll + des filtres li mhedi ya"tehom f url

router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.protect, trajetController.createTrajet);

// router("/trajets/:id/:Passagers").patch(
//   authController.protect,
//   trajetController.reserverTrajet
// );

module.exports = router;
