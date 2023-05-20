const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.get(
//   "/:slug",
//   authController.protect,
//   trajetController.getUserTrajects
// );

<<<<<<< HEAD
router.get("/search", trajetController.searchTrajets); //je pense c mieuc dutiliser li deja rak khademha get zll + des filtres li mhedi ya"tehom f url

router.get(
  "/currentUser",
  authController.isLoggedIn,
  authController.getCurrentUser
);
<<<<<<< HEAD
=======

>>>>>>> said
=======
>>>>>>> 55b9ef65b610f4f5d2732f282fa7c5d03e41f1f4
router
  .route("/")
  .get(trajetController.getAllTrajets)
  .post(authController.isLoggedIn, trajetController.createTrajet);
<<<<<<< HEAD
<<<<<<< HEAD

// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router.route("/:id").get(trajetController.getTrajet);
=======
>>>>>>> said
=======

// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router
  .route("/:id")
  .get(trajetController.getTrajet)
  .patch(trajetController.updateTrajet)
  .delete(trajetController.deleteTrajet);
>>>>>>> 55b9ef65b610f4f5d2732f282fa7c5d03e41f1f4

router.use(authController.protect);
router.route("/conducteur/:slug").get(trajetController.getUserTrajects);
router.route("/passager/:slug").get(trajetController.getUserReservations);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
