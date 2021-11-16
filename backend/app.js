const express = require("express");

const bodyParser = require("body-parser");

//IMPORTATION DE MONGOOSE
const mongoose = require("mongoose");

const path = require("path");

//IMPORT DES ROUTES POUR L'APPLICATION
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

//CONNEXION A MONGODB
mongoose
  .connect(
    "mongodb+srv://Melissa_94:melissa-developpeur@cluster0.oyhrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//CREATION DE L'APPLICATION EXPRESS
const app = express();

//MODIFICATION DES HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());


//DIFFERENTES OPTIONS DE L'APPLICATION
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

//EXPORTATION DE L'APPLICATION
module.exports = app;
