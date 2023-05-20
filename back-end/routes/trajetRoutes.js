const express = require("express");
const trajetController = require("./../controllers/trajetController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.get(
//   "/:slug",
//   authController.protect,
//   trajetController.getUserTrajects
// );


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


// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router.route("/:id").get(trajetController.getTrajet);


// router.route("/:slug/:date/:heurD").get(trajetController.getTrajet);
router
  .route("/:id")
  .get(trajetController.getTrajet)
  .patch(trajetController.updateTrajet)
  .delete(trajetController.deleteTrajet);


router.use(authController.protect);
router.route("/conducteur/:slug").get(trajetController.getUserTrajects);
router.route("/passager/:slug").get(trajetController.getUserReservations);
router.route("/reserver/:id").post(trajetController.reserverTrajet);

module.exports = router;
