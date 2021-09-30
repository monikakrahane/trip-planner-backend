const express = require("express");
const hotelsController = require("../controllers/hotels.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();
router.get("/", hotelsController.getHotels);
router.get("/:id", hotelsController.getHotelsById);
router.post("/add", hotelsController.save);
router.get("/get-all/:userId", hotelsController.getHotelDetails);
router.delete("/delete/:id/:userId", hotelsController.deleteHotel);
module.exports = router;
