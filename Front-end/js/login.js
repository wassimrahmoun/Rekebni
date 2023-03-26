// la configuration de la base de données MongoDB et la création d'un modèle de schéma pour les utilisateurs ;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nom-de-la-base-de-donnees", {
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

//a configuration du serveur Express et la création des routes pour le formulaire de connexion
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
// une route POST qui écoute les requêtes envoyées à l'URL "/login"
app.post("/login", async (req, res) => {
  // la destructuration d'objet pour extraire les propriétés "email" et "password"
  const { email, password } = req.body;
  //   nous utilisons la méthode findOne() de Mongoose pour chercher un utilisateur dans la base de données qui a l'adresse email fournie dans la requête.
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Utilisateur non trouvé" });
  }
  //   si aucun utilisateur n'est trouvé, la réponse renvoie un code de statut 404 (non trouvé) et un message d'erreur approprié.
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "Mot de passe incorrect" });
  }
  //    la fonction compare() de la bibliothèque bcrypt pour comparer le mot de passe fourni dans la requête avec le mot de passe stocké pour cet utilisateur dans la base de données.
  const token = jwt.sign({ userId: user._id }, "votre-secret");
  //Si l'utilisateur est trouvé et que le mot de passe est correct, nous créons un jeton JWT en signant un objet contenant l'ID de l'utilisateur avec une clé secrète.
  res.cookie("token", token);
  //   Nous envoyons le jeton JWT au navigateur en le stockant dans un cookie et nous redirigeons l'utilisateur vers la page d'accueil.
  res.redirect("/accueil");
});

app.get("/accueil", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decodedToken = jwt.verify(token, "votre-secret");
    res.send(`Bienvenue, utilisateur ${decodedToken.userId}`);
  } catch (err) {
    res.redirect("/login");
  }
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
