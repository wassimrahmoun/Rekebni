const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/search", trajetController.searchTrajets); //je pense c mieuc dutiliser li deja rak khademha get zll + des filtres li mhedi ya"tehom f url

router.get(
  "/currentUser",
  authController.isLoggedIn,
  authController.getCurrentUser
);

router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.isLoggedIn, trajetController.createTrajet);

router.use(authController.protect);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
