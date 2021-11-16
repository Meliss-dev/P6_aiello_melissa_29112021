const express = require("express");

//ROUTEUR
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

//IMPORT MIDDLEWARE AUTHENTIFICATION
const auth = require("../middleware/auth");

//IMPORT MIDDLEWARE MULTER
const multer = require("../middleware/multer-config");

//IMPORT MIDDLEWARE INPUT
const input = require("../middleware/input");

//IMPORT MIDDLEWARE INPUTCREATE
const inputcreate = require("../middleware/inputcreate");

router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, multer, inputcreate, saucesCtrl.createSauces);
router.put("/:id", auth, multer, input, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);
router.get("/:id", auth, saucesCtrl.getOneSauces);

router.post("/:id/like", auth, multer, saucesCtrl.createSaucesLike);

module.exports = router;
