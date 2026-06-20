const express = require("express");

const router = express.Router();

const predictionController = require("../controllers/predictionController");

router.get("/battery", predictionController.getBatteryPrediction);

router.get("/temperature", predictionController.getTemperaturePrediction);

router.get("/disk", predictionController.getDiskPrediction);

module.exports = router;