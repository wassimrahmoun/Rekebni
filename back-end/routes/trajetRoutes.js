const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.use(authController.deletTrajets);

router.get("/search", trajetController.searchTrajets); //je pense c mieuc dutiliser li deja rak khademha get zll + des filtres li mhedi ya"tehom f url

router
  .route("/")
  .get(authController.isLoggedIn, trajetController.getAllTrajets)
  .post(authController.isLoggedIn, trajetController.createTrajet);

// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router.route("/:id").get(trajetController.getTrajet);

router.use(authController.protect);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
