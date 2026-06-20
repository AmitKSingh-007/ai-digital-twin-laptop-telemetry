const anomalyDetector = require("../detectors/anomalyDetector");

function getAnomalies(req, res) {

    const anomalies = anomalyDetector.detectAnomalies();

    res.json(anomalies);

}

module.exports = { getAnomalies };