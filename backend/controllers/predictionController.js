const batteryPredictor = require("../predictors/batteryPredictor");

const temperaturePredictor = require("../predictors/tempPredictor");

const diskPredictor = require("../predictors/diskPredictor");

function getBatteryPrediction(req, res) {

    res.json(batteryPredictor.predictBatteryHealth());

}

function getTemperaturePrediction(req, res) {

    res.json(temperaturePredictor.predictTemperature());

}

function getDiskPrediction(req, res) {

    res.json(diskPredictor.predictDiskHealth());

}

module.exports = {

    getBatteryPrediction,

    getTemperaturePrediction,

    getDiskPrediction

};