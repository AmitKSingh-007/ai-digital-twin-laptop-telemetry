const fanFailure = require("../simulators/fanFailure");

const desertHeat = require("../simulators/desertHeat");

const heavyCompile = require("../simulators/heavyCompile");

const { setSimulation } = require("../config/simulationState");

function simulateFanFailure(req, res) {

    const load = Number(req.query.load) || 90;

    const result = fanFailure.simulateFanFailure(load);

    setSimulation("fanFailure");

    res.json(result);

}

function simulateDesertHeat(req, res) {

    const load = Number(req.query.load) || 90;

    const ambientTemp = Number(req.query.ambientTemp) || 48;

    const result = desertHeat.simulateDesertHeat(load, ambientTemp);

    setSimulation("desertHeat");

    res.json(result);

}

function simulateHeavyCompile(req, res) {

    const load = Number(req.query.load) || 85;

    const result = heavyCompile.simulateHeavyCompile(load);

    setSimulation("heavyCompile");

    res.json(result);

}

function resetSimulation(req, res) {

    setSimulation(null);

    res.json({

        scenario: "Simulation Reset",

        message:
            "Digital Twin returned to normal operating conditions"

    });

}

module.exports = { simulateFanFailure, simulateDesertHeat, simulateHeavyCompile, resetSimulation };