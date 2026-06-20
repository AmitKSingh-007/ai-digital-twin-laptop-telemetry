const express = require("express");

const router = express.Router();

const simulationController = require("../controllers/simulationController");

router.get("/fan-failure", simulationController.simulateFanFailure);

router.get("/desert-heat", simulationController.simulateDesertHeat);

router.get("/heavy-compile", simulationController.simulateHeavyCompile);

module.exports = router;