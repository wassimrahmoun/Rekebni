const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema({
  Depart: {
    type: String,
    require: [true, "Vous devez ajouter un point de depart  "],
  },
  Arrivée: {
    type: String,
    required: [true, "Vous devez ajouter un point de d'arriver"],
  },
  Vehicule: {
    type: String,
    required: [true, "Vous devez preciser votre vehicule"],
  },
  Matricule: {
    type: String,
    required: [true, "Vous devez preciser votre plaque d'immatriculation"],
  },

  places: {
    type: Number,
    required: [true, "Vous devez entrer le nobre de passager"],
  },
  fumers: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    required: [true, "Vous devez ajouter date de depart"],
  },
  HeurD: {
    type: String,
    required: [true, "Vous devez ajouter une heur de départ"],
  },
  HeurA: {
    type: String,
    required: [true, "Vous devez ajouter une heur de d'arrivé"],
  },
  Prix: {
    type: Number,
    required: [true, "Vous devez ajouter un prix a votre trajet"],
  },
  Conducteur: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A driver is required"],
  },
});

trajetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Trajet = mongoose.model("Trajet", trajetSchema);
module.exports = Trajet;
