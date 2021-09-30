const Validator = require("fastest-validator");
const models = require("../models");
const _ = require("lodash");

// Get API to get all Hotels
function getHotels(req, res) {
  models.Hotels.findAll({
    attributes: [
      "id",
      "title",
      `contact_no`,
      `website`,
      `address`,
      `pincode`,
      `city`,
      `state`,
      `price`,
      `description`,
      `hotel_type`,
      `star`,
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

function getHotelsById(req, res) {
  const id = req.params.id;

  models.Hotels.findByPk(id)

    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Hotels not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

//Post API to add items to favourites
function save(req, res) {
  const savedHotel = {
    userId: req.body.userId,
    hotelId: req.body.hotelId,
  };

  const schema = {
    userId: { type: "number", optional: false, max: "32" },
    hotelId: { type: "number", optional: false, max: "32" },
  };

  const v = new Validator();
  const validationResponse = v.validate(savedHotel, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.savedhotels
    .create(savedHotel)
    .then((result) => {
      res.status(201).json({
        message: "Hotel saved successfully",
        savedHotel: result,
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
function getHotelDetails(req, res) {
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
  models.savedhotels
    .findAll({
      attributes: ["id", "userId", `hotelId`],
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: models.Hotels,
          attributes: [
            "id",
            "title",
            `contact_no`,
            `website`,
            `address`,
            `pincode`,
            `city`,
            `state`,
            `price`,
            `description`,
            `hotel_type`,
            `star`,
            `image`,
          ],
        },
      ],
    })
    .then((result) => {
      result = _.map(result, (a) => {
        return a.Hotel;
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

async function deleteHotel(req, res) {
  const id = req.params.id;
  const userId = req.params.userId;

  // find the destination first
  const hotel = await models.savedhotels.findOne({
    where: { hotelId: id, userId: userId },
  });
  console.log(hotel);
  if (hotel) {
    await models.savedhotels
      .destroy({ where: { hotelId: id, userId: userId } })
      .then((result) => {
        res.status(200).json({
          message: "Hotels deleted successfully",
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
  getHotels: getHotels,
  getHotelsById: getHotelsById,
  getHotelDetails: getHotelDetails,
  save: save,
  deleteHotel: deleteHotel,
};
