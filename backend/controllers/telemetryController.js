const telemetryService = require("../services/telemetryService");

function getLatestTelemetry(req, res) {

    const data = telemetryService.getLatestTelemetry();
    res.json(data);

}

function getTelemetryHistory(req, res) {

    const data = telemetryService.getAllTelemetry();
    res.json(data);

}

function getSystemSummary(req, res) {

    const data = telemetryService.getSystemSummary();
    res.json(data);
}

module.exports = {

    getLatestTelemetry,

    getTelemetryHistory,

    getSystemSummary

};