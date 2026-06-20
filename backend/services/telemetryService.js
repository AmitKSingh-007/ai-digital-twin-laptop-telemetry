const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/telemetry.json");

function getAllTelemetry() {

    const rawData =
        fs.readFileSync(
            DATA_PATH,
            "utf8"
        );

    return JSON.parse(rawData);

};

function getLatestTelemetry() {

    const telemetry =
        getAllTelemetry();

    return telemetry[
        telemetry.length - 1
    ];

};

function getTelemetryWindow(minutes) {

    const telemetry =
        getAllTelemetry();

    return telemetry.slice(
        -minutes
    );

};

function getAverageTemperature(telemetry) {

    let totalTemperature = 0;

    for (const record of telemetry) {

        totalTemperature +=
            record.cpu_temperature_c;

    }

    return Number(
        (
            totalTemperature /
            telemetry.length
        ).toFixed(2)
    );

};

function getMaximumTemperature(telemetry) {

    let maximumTemperature = 0;

    for (const record of telemetry) {

        if (
            record.cpu_temperature_c >
            maximumTemperature
        ) {

            maximumTemperature =
                record.cpu_temperature_c;

        }

    }

    return maximumTemperature;

};

function getAverageCpuLoad(telemetry) {

    let totalLoad = 0;

    for (const record of telemetry) {

        totalLoad +=
            record.cpu_utilization_pct;

    }

    return Number(
        (
            totalLoad /
            telemetry.length
        ).toFixed(2)
    );

};

function getWarningCount(telemetry) {

    let warningCount = 0;

    for (const record of telemetry) {

        if (
            record.thermal_state ===
            "WARNING"
        ) {

            warningCount++;

        }

    }

    return warningCount;

};

function getThrottlingCount(telemetry) {

    let throttlingCount = 0;

    for (const record of telemetry) {

        if (
            record.thermal_state ===
            "THROTTLING"
        ) {

            throttlingCount++;

        }

    }

    return throttlingCount;

};

function getSystemSummary() {

    const telemetry = getAllTelemetry()

    return {

        average_temperature_c:
            getAverageTemperature(telemetry),

        maximum_temperature_c:
            getMaximumTemperature(telemetry),

        average_cpu_load_pct:
            getAverageCpuLoad(telemetry),

        warning_events:
            getWarningCount(telemetry),

        throttling_events:
            getThrottlingCount(telemetry)

    };

};

module.exports = {

    getAllTelemetry,

    getLatestTelemetry,

    getTelemetryWindow,

    getAverageTemperature,

    getMaximumTemperature,

    getAverageCpuLoad,

    getWarningCount,

    getThrottlingCount,

    getSystemSummary

};
