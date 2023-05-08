const mongoose = require("mongoose");
const slugify = require("slugify");

const trajetSchema = new mongoose.Schema({
  Depart: {
    type: String,
    required: [true, "Vous devez ajouter un point de depart  "],
  },
  Arrivée: {
    type: String,
    required: [true, "Vous devez ajouter un point de d'arriver"],
  },
  Vehicule: {
    type: String,
    required: [true, "Vous devez preciser votre vehicule"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  Couleur: {
    type: String,
    required: [true, "Vous devez preciser la couleur de votre vehicule"],
    default: "Blanc",
    values: [
      "Blanc",
      "noir",
      "rouge",
      "orange",
      "blue",
      "gris",
      "jaune",
      "maron",
      "violet",
      "vert",
    ],
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
  slug: String,
  Conducteur: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A driver is required"],
  },
  Passagers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

//pour pas avoir la date + heur que la date
trajetSchema.pre("save", function (next) {
  this.date = this.date.toISOString().substring(0, 10);
  next();
});

// pouvoir cree des trucs le meme jour sans isactive = false
trajetSchema.pre("save", function (next) {
  const currentDate = new Date();

  date = currentDate;

  date = date.toISOString().substring(0, 10);

  if (this.date < date) {
    this.isActive = false;
  }
  next();
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
