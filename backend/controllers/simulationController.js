const fanFailure = require("../simulators/fanFailure");

const desertHeat = require("../simulators/desertHeat");

const heavyCompile = require("../simulators/heavyCompile");

function simulateFanFailure(req, res) {

    const load = Number(req.query.load) || 90;

    const result = fanFailure.simulateFanFailure(load);

    res.json(result);

}

function simulateDesertHeat(req, res) {

    const load = Number(req.query.load) || 90;

    const ambientTemp = Number(req.query.ambientTemp) || 48;

    const result = desertHeat.simulateDesertHeat(load, ambientTemp);

    res.json(result);

}

function simulateHeavyCompile(req, res) {

    const load = Number(req.query.load) || 85;

    const result = heavyCompile.simulateHeavyCompile(load);

    res.json(result);

}

module.exports = { simulateFanFailure, simulateDesertHeat, simulateHeavyCompile };