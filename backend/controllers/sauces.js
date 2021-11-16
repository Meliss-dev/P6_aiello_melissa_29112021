const Sauces = require("../models/Sauce");
const fs = require("fs");

exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file
    ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauces.updateOne(
    { _id: req.params.id },
    { ...saucesObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.createSaucesLike = (req, res, next) => {
  console.log("vérifie le like");
  console.log(req.body);

  Sauces.findOne({ _id: req.params.id }).then((saucesObject) => {
    console.log(saucesObject);

    if (req.body.like === 1) {
      let tableauUsersLike = saucesObject.usersLiked;
      tableauUsersLike.push(req.body.userId);

      Sauces.updateOne(
        { _id: req.params.id },
        { likes: saucesObject.likes + 1, usersLiked: tableauUsersLike }
      )
        .then(() => res.status(200).json({ message: "Objet like !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like === -1) {
      console.log("objet dislike premier");

      let tableauUsersDislike = saucesObject.usersDisliked;
      tableauUsersDislike.push(req.body.userId);
      console.log("objet dislike deuxieme");
      console.log(tableauUsersDislike);
      Sauces.updateOne(
        { _id: req.params.id },
        {
          dislikes: saucesObject.dislikes + 1,
          usersDisliked: tableauUsersDislike,
        }
      )
        .then(() => res.status(200).json({ message: "Objet dislike !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like === 0) {
      if (saucesObject.usersLiked.includes(req.body.userId)) {
        let tableauUsersLike = saucesObject.usersLiked;
        let indexOfUserId = tableauUsersLike.indexOf(req.body.userId);
        tableauUsersLike.splice(indexOfUserId, 1);

        Sauces.updateOne(
          { _id: req.params.id },
          { likes: saucesObject.likes - 1, usersLiked: tableauUsersLike }
        )
          .then(() => res.status(200).json({ message: "Objet like !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    
    
      if (saucesObject.usersDisliked.includes(req.body.userId)) {
        let tableauUsersDislike = saucesObject.usersDisliked;
        let indexOfUserId = tableauUsersDislike.indexOf(req.body.userId);
        tableauUsersDislike.splice(indexOfUserId, 1);
        console.log("place du tableau");
        console.log(tableauUsersDislike);
        Sauces.updateOne(
          { _id: req.params.id },
          {
            dislikes: saucesObject.dislikes - 1,
            usersDisliked: tableauUsersDislike,
          }
        )
          .then(() => res.status(200).json({ message: "Objet like !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};
