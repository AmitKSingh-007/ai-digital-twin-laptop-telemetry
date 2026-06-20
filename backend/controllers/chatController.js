const telemetryService = require("../services/telemetryService");

const { detectAnomalies } = require("../detectors/anomalyDetector");

const { predictBatteryHealth } = require("../predictors/batteryPredictor");

const { predictTemperature } = require("../predictors/tempPredictor");

const { getSimulationContext } = require("../services/simulationQuestionService");


require("dotenv").config();

const { askGroq } = require("../services/groqService");

async function chat(req, res) {

    const question = req.body.question;

    const telemetry = telemetryService.getLatestTelemetry();

    const anomalies = detectAnomalies();

    const batteryPrediction = predictBatteryHealth();

    const simulationContext = getSimulationContext(question);

    const temperaturePrediction = predictTemperature();

    const anomalyText = anomalies.map(a => `${a.type} (${a.severity}): ${a.message}`).join("\n");

    const batteryText = `
        Current Battery Health:
            ${batteryPrediction.current_health_pct}%

        Predicted Battery Health (30 Days):
            ${batteryPrediction.predicted_health_30_days}%

        Battery Risk:
            ${batteryPrediction.risk}
    `;

    const temperatureText = `
        Current Temperature:
            ${temperaturePrediction.current_temperature_c}°C

        Predicted Temperature (10 Minutes):
            ${temperaturePrediction.predicted_temperature_10min}°C

        Trend:
            ${temperaturePrediction.trend}

        Temperature Risk:
            ${temperaturePrediction.risk}
    `;

    const context = `
        Current Telemetry:
        CPU Temperature: ${telemetry.cpu_temperature_c}°C
        CPU Load: ${telemetry.cpu_utilization_pct}%
        Memory Usage: ${telemetry.memory_utilization_pct}%
        Thermal State: ${telemetry.thermal_state}

        Anomalies:
            ${anomalyText}

            ${batteryText}

            ${temperatureText}

        Simulation: 
            ${simulationContext}

        User Question: ${question}
    `;

    const answer = await askGroq(context);

    res.json({ answer });

}

module.exports = { chat };