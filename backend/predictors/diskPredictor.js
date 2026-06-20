const telemetryService = require("../services/telemetryService");

function predictDiskHealth() {

    const telemetry = telemetryService.getAllTelemetry();

    const latest = telemetry[telemetry.length - 1];

    const currentHealth = latest.disk_health_pct;

    let thermalStressEvents = 0;

    for (const record of telemetry) {

        if (record.cpu_temperature_c > 80) {
            thermalStressEvents++;
        }
    }

    const wearRate = thermalStressEvents * 0.001;

    const predictedHealth30Days = Math.max(0, Number((currentHealth - wearRate * 30).toFixed(2)));

    let risk = "LOW";

    if (predictedHealth30Days < 95) {
        risk = "MEDIUM";
    } else if (predictedHealth30Days < 90) {
        risk = "HIGH";
    }

    return {

        current_health_pct:
            currentHealth,

        predicted_health_30_days:
            predictedHealth30Days,

        thermal_stress_events:
            thermalStressEvents,

        risk

    };

}

module.exports = {
    predictDiskHealth
};