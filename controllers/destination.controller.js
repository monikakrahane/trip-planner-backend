const Validator = require("fastest-validator");
const models = require("../models");
const _ = require("lodash");
// Get API to get all destinations
function getDestinations(req, res) {
  models.Destinations.findAll({
    attributes: [
      "id",
      "title",
      `address`,
      `pincode`,
      `city`,
      `state`,
      `visiting_hours`,
      `visiting_fee`,
      `description`,
      `picture`,
      `image`,
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

//Post API to add items to favourites
function save(req, res) {
  const savedDest = {
    userId: req.body.userId,
    destId: req.body.destId,
  };

  const schema = {
    userId: { type: "number", optional: false, max: "32" },
    destId: { type: "number", optional: false, max: "32" },
  };

  const v = new Validator();
  const validationResponse = v.validate(savedDest, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.saveddestinations
    .create(savedDest)
    .then((result) => {
      res.status(201).json({
        message: "Destinations saved successfully",
        savedDest: result,
        status: 201,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

// API to get dest data
function getDestinationsDetails(req, res) {
  // const savedDest = {
  //     userId: req.params.userId
  // }

  // const schema = {
  //     userId: {type:"number", optional: false, max: "32"}
  // }

  // const v = new Validator();
  // const validationResponse = v.validate(savedDest, schema);

  // if(validationResponse !== true){
  //     return res.status(400).json({
  //         message: "Validation failed",
  //         errors: validationResponse
  //     });
  // }
  models.saveddestinations
    .findAll({
      attributes: ["id", "userId", `destId`],
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: models.Destinations,
          attributes: [
            "id",
            "title",
            "address",
            "pincode",
            "city",
            "state",
            "visiting_hours",
            "visiting_fee",
            "description",
            "image",
          ],
        },
      ],
    })
    .then((result) => {
      result = _.map(result, (a) => {
        return a.Destination;
      });
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!" + error,
      });
    });
}

function getDestinationById(req, res) {
  const id = req.params.id;
  models.Destinations.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Destinations not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

async function deleteDestination(req, res) {
  const id = req.params.id;
  const userId = req.params.userId;

  // find the destination first
  const dest = await models.saveddestinations.findOne({
    where: { destId: id, userId: userId },
  });
  console.log(dest);
  if (dest) {
    await models.saveddestinations
      .destroy({ where: { destId: id, userId: userId } })
      .then((result) => {
        res.status(200).json({
          message: "Destination deleted successfully",
          status: 200,
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "Something went wrong",
          error: error,
        });
      });
  } else {
    res.status(404).json({
      message: "No destination found",
    });
  }
}

module.exports = {
  getDestinations: getDestinations,
  save: save,
  getDestinationsDetails: getDestinationsDetails,
  getDestinationById: getDestinationById,
  deleteDestination: deleteDestination,
};
