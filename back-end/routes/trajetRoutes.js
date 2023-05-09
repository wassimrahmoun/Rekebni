const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.use(authController.deletTrajets);

router.get("/search", trajetController.searchTrajets); //je pense c mieuc dutiliser li deja rak khademha get zll + des filtres li mhedi ya"tehom f url

router.get(
  "/currentUser",
  authController.isLoggedIn,
  authController.getCurrentUser
);
<<<<<<< HEAD
=======

>>>>>>> said
router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.isLoggedIn, trajetController.createTrajet);
<<<<<<< HEAD

// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router.route("/:id").get(trajetController.getTrajet);
=======
>>>>>>> said

router.use(authController.protect);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
