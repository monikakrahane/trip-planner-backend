const express = require("express");
const destinationController = require("../controllers/destination.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();
router.get("/", destinationController.getDestinations);
router.get("/:id", destinationController.getDestinationById);
router.post("/add", destinationController.save);
router.get("/get-all/:userId", destinationController.getDestinationsDetails);
router.delete("/delete/:id/:userId", destinationController.deleteDestination);
module.exports = router;
