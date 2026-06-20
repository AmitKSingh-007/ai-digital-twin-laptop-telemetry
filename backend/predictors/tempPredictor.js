const telemetryService = require("../services/telemetryService");

const { calculatePower, updateTemperature } = require("../config/telemetryUtils");

function predictTemperature() {

    const latest = telemetryService.getLatestTelemetry();

    let predictedTemp = latest.cpu_temperature_c;

    const load = latest.cpu_utilization_pct;

    const power = calculatePower(load);

    // Simulate next 10 minutes

    for (let minute = 0; minute < 10; minute++) {
        predictedTemp = updateTemperature(predictedTemp, power);
    }

    predictedTemp = Math.round(predictedTemp);

    let risk = "LOW";

    if (predictedTemp >= 80) {
        risk = "MEDIUM";
    } else if (predictedTemp >= 90) {
        risk = "HIGH";
    }

    return {

        current_temperature_c:
            latest.cpu_temperature_c,

        current_cpu_load_pct:
            load,

        predicted_temperature_10min:
            predictedTemp,

        temperature_change_c:
            predictedTemp -
            latest.cpu_temperature_c,

        trend:
            predictedTemp > latest.cpu_temperature_c ? "HEATING" : predictedTemp < latest.cpu_temperature_c ? "COOLING": "STABLE",

        risk

    };

}

module.exports = { predictTemperature };