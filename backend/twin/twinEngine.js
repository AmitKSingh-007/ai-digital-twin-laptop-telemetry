const telemetryService = require("../services/telemetryService");

const anomalyDetector = require("../detectors/anomalyDetector");

const batteryPredictor = require("../predictors/batteryPredictor");

const tempPredictor = require("../predictors/tempPredictor");

const diskPredictor = require("../predictors/diskPredictor");

function generateTwinReport() {

    const currentState = telemetryService.getLatestTelemetry();

    const summary = telemetryService.getSystemSummary();

    const anomalies = anomalyDetector.detectAnomalies();

    const batteryPrediction = batteryPredictor.predictBatteryHealth();

    const temperaturePrediction = tempPredictor.predictTemperature();

    const diskPrediction = diskPredictor.predictDiskHealth();

    const recommendations = [];

    //Recommedation for thermal throttling

    if (anomalies.some(anomaly => anomaly.type === "THERMAL_THROTTLING")) {
        recommendations.push("Reduce heavy workloads or improve cooling to avoid thermal throttling.");
    }

    //Recommendation for fan overuse

    if (anomalies.some(anomaly => anomaly.type === "FAN_OVERUSE")) {
        recommendations.push("Cooling system experienced sustained high RPM operation. Inspect vents and airflow.");
    }

    //Recommendation for temperature

    if (temperaturePrediction.risk === "HIGH") {
        recommendations.push("CPU temperature is predicted to reach critical levels.");
    }

    //Recommendation for battery

    if (batteryPrediction.risk !== "LOW") {
        recommendations.push("Battery health degradation is accelerating.");
    }

    //Recommendation for disk

    if (diskPrediction.risk !== "LOW") {
        recommendations.push("Disk health is declining. Backup important data.");
    }

    if (recommendations.length === 0) {
        recommendations.push("System operating normally.");
    }

    return {

        generated_at: new Date().toISOString(),

        current_state:
            currentState,

        system_summary:
            summary,

        anomalies,

        predictions: {

            battery:
                batteryPrediction,

            temperature:
                temperaturePrediction,

            disk:
                diskPrediction

        },

        recommendations

    };
}

module.exports = { generateTwinReport };