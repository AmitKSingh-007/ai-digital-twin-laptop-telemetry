const express = require("express");

const router = express.Router();

const anomalyController = require("../controllers/anomalyController");

router.get("/", anomalyController.getAnomalies);

module.exports = router;