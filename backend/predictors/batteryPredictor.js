const telemetryService = require("../services/telemetryService");

function predictBatteryHealth() {
    const telemetry = telemetryService.getAllTelemetry();

    const latest = telemetry[telemetry.length - 1];

    const currentHealth = latest.battery_health_pct;

    let heatStressEvents = 0;

    for (const record of telemetry) {

        if (record.cpu_temperature_c > 80) {
            heatStressEvents++;
        }
    }

    const dailyWear = heatStressEvents * 0.002;

    const predictedHealth30Days = Math.max(0, Number((currentHealth - (dailyWear * 30)).toFixed(2)));

    let risk = "LOW";

    if (predictedHealth30Days < 90) {
        risk = "MEDIUM";
    }else if (predictedHealth30Days < 80) {
        risk = "HIGH";
    }

    return {

        current_health_pct:
            currentHealth,

        predicted_health_30_days:
            predictedHealth30Days,

        heat_stress_events:
            heatStressEvents,

        risk
    };
}

module.exports = { predictBatteryHealth };