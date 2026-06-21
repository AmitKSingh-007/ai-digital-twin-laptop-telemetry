const telemetryService = require("../services/telemetryService");

function detectHighTemperature() {

    const latest = telemetryService.getLatestTelemetry();

    if (latest.cpu_temperature_c >= 80) {

        return {

            type:
                "HIGH_TEMPERATURE",

            severity:
                latest.cpu_temperature_c >= 90 ? "HIGH" : "MEDIUM",

            message:
                `CPU temperature is ${latest.cpu_temperature_c}°C`
        };
    }
    return null;
};


function detectThermalThrottling() {

    const telemetry = telemetryService.getAllTelemetry();

    let throttlingCount = 0;

    for (const record of telemetry) {
        if ( record.thermal_state === "THROTTLING") {
            throttlingCount++;
        }
    }

    if (throttlingCount > 0) {

        return {

            type:
                "THERMAL_THROTTLING",

            severity:
                "HIGH",

            message:
                `${throttlingCount} throttling events detected`
        };
    }
    return null;
};

function detectBatteryHealth() {

    const latest = telemetryService.getLatestTelemetry();

    if (latest.battery_health_pct < 90) {

        return {

            type:
                "BATTERY_HEALTH",

            severity:
                "MEDIUM",

            message:
                `Battery health is ${latest.battery_health_pct}%`
        };
    }
    return null;
};


function detectDiskHealth() {

    const latest = telemetryService.getLatestTelemetry();

    if (latest.disk_health_pct < 95) {

        return {

            type:
                "DISK_HEALTH",

            severity:
                "MEDIUM",

            message:
                `Disk health is ${latest.disk_health_pct}%`
        };
    }
    return null;
};

function detectFanOveruse() {

    const telemetry = telemetryService.getAllTelemetry();

    let highFanCount = 0;

    for (const record of telemetry) {

        if (record.fan_speed_rpm >= 4600) {
            highFanCount++;
        }
    }

    if (highFanCount > 10) {

        return {

            type:
                "FAN_OVERUSE",

            severity:
                "LOW",

            message:
                `Fan operated at maximum speed for ${highFanCount} intervals`
        };
    }
    return null;
};
function detectMemoryPressure() {

    const latest = telemetryService.getLatestTelemetry();

    if (latest.memory_utilization_pct >= 40) {

        return {

            type: "MEMORY_PRESSURE",

            severity:
                latest.memory_utilization_pct >= 60
                    ? "HIGH"
                    : "MEDIUM",

            message:
                `Memory utilization is ${latest.memory_utilization_pct}%`
        };

    }

    return null;
}

function detectAnomalies() {

    const anomalies = [];

    const checks = [

        detectHighTemperature(),

        detectThermalThrottling(),

        detectBatteryHealth(),

        detectDiskHealth(),

        detectFanOveruse(),

        detectMemoryPressure()

    ];

    for (const result of checks) {

        if (result) {
            anomalies.push(result);
        }
    }
    return anomalies;
};

module.exports = {

    detectHighTemperature,

    detectThermalThrottling,

    detectBatteryHealth,

    detectDiskHealth,

    detectFanOveruse,

    detectAnomalies,

    detectMemoryPressure

};