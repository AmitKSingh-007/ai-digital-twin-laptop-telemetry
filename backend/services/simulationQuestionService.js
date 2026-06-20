const { simulateFanFailure } = require("../simulators/fanFailure");

const { simulateDesertHeat } = require("../simulators/desertHeat");

const { simulateHeavyCompile } = require("../simulators/heavyCompile");

function extractTemperature(question) {

    const match =
        question.match(/\d+/);

    return match
        ? Number(match[0])
        : null;

}

function getSimulationContext(question) {

    const lowerQuestion = question.toLowerCase();

    let simulationContext = "";

    if (lowerQuestion.includes("fan")) {

        const result = simulateFanFailure(90);

        simulationContext += `

                Fan Failure Simulation:

                Predicted Temperature:
                    ${result.predicted_temperature_c}°C

                Thermal State:
                    ${result.thermal_state}

                Risk:
                    ${result.risk}

        `;

    }

    if (lowerQuestion.includes("gaming") || lowerQuestion.includes("compile") || lowerQuestion.includes("gaming") || lowerQuestion.includes("game")
        || lowerQuestion.includes("build") || lowerQuestion.includes("render")) {

        const result = simulateHeavyCompile(85);

        simulationContext += `

            Heavy Compile Simulation:

            Predicted Temperature:
                ${result.predicted_temperature_c}°C

            Thermal State:
                ${result.thermal_state}

            Risk:
                ${result.risk}

        `;

    }

    if (lowerQuestion.includes("room") || lowerQuestion.includes("ambient") || lowerQuestion.includes("desert")
        || lowerQuestion.includes("environment")) {

        const ambientTemp = extractTemperature(question) || 48;

        const result = simulateDesertHeat(90, ambientTemp);

        simulationContext += `

            Desert Heat Simulation:

            Ambient Temperature:
                ${ambientTemp}°C

            Predicted Temperature:
                ${result.predicted_temperature_c}°C

            Thermal State:
                ${result.thermal_state}

            Risk:
                ${result.risk}

        `;

    }

    return simulationContext;

}

module.exports = { getSimulationContext };