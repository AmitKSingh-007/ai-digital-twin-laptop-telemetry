const fs = require("fs");
const path = require("path");

const {
    HARDWARE,
    generateWorkload,
    calculatePower,
    updateTemperature,
    updateFanState,
    applyThermalThrottling,
    randomBetween
} = require("../config/telemetryUtils");

const { getSimulation } = require("../config/simulationState");

function appendTelemetryRecord() {

    const outputPath =
        path.join(
            __dirname,
            "telemetry.json"
        );

    const telemetry =
        JSON.parse(
            fs.readFileSync(
                outputPath,
                "utf8"
            )
        );

    const lastRecord =
        telemetry[
        telemetry.length - 1
        ];

    let intendedLoad =
        generateWorkload();


    const simulation =
        getSimulation();

    if (simulation === "heavyCompile") {

        intendedLoad = 95;

    }

    const activeLoad =
        applyThermalThrottling(
            intendedLoad,
            lastRecord.cpu_temperature_c
        );

    const power =
        calculatePower(
            activeLoad
        );

    let temperature =
        updateTemperature(
            lastRecord.cpu_temperature_c,
            power
        );

    if (simulation === "fanFailure") {

        temperature += 12;

    }

    if (simulation === "desertHeat") {

        temperature += 12;

    }

    let fanHigh =
        lastRecord.fan_speed_rpm >
        HARDWARE.LOW_FAN_SPEED;

    fanHigh =
        updateFanState(
            temperature,
            fanHigh
        );

    let fanSpeed =
        fanHigh
            ? HARDWARE.HIGH_FAN_SPEED
            : HARDWARE.LOW_FAN_SPEED;

    if (simulation === "fanFailure") {

        fanSpeed =
            HARDWARE.LOW_FAN_SPEED;

    }

    if (temperature > HARDWARE.CRITICAL_TEMP) {

        temperature = HARDWARE.CRITICAL_TEMP;

    }

    let thermalState = "NORMAL";

    if (temperature >= 100) {

        thermalState = "CRITICAL";

    }
    else if (temperature >= HARDWARE.THROTTLE_TEMP) {

        thermalState = "THROTTLING";

    }
    else if (temperature >= 80) {

        thermalState = "WARNING";

    }


    const gpuTemp =
        Math.max(
            30,
            Math.round(
                temperature -
                randomBetween(2, 6)
            )
        );

    const memoryUsage =
        Math.min(
            HARDWARE.MAX_MEMORY_USAGE,
            Math.round(
                20 +
                activeLoad * 0.7 +
                randomBetween(0, 10)
            )
        );

    let wifiSignal =
        randomBetween(
            HARDWARE.MIN_WIFI_SIGNAL,
            HARDWARE.MAX_WIFI_SIGNAL
        );
    if (activeLoad > 80) {

        wifiSignal -=
            randomBetween(2, 5);

    }

    if (simulation === "desertHeat") {

        wifiSignal -= 10;

    }

    const cpuFrequency =
        Number(
            (
                1.2 +
                (activeLoad / 100) * 3.4
            ).toFixed(2)
        );

    let powerMode =
        cpuFrequency >= 3.5
            ? "Performance"
            : cpuFrequency >= 2
                ? "Balanced"
                : "Power Saver";

    if (simulation === "desertHeat") {

        powerMode = "Performance";

    }

    let batteryHealth =
        lastRecord.battery_health_pct;

    if (temperature > 80) {

        batteryHealth =
            Math.max(
                0,
                batteryHealth - 0.01
            );

    }

    let diskHealth =
        lastRecord.disk_health_pct;

    if (temperature > 80) {

        diskHealth =
            Math.max(
                0,
                diskHealth - 0.003
            );

    }


    let sessionType =
        "Browsing";

    if (activeLoad < 20)
        sessionType = "Idle";

    else if (activeLoad < 50)
        sessionType = "Browsing";

    else if (activeLoad < 80)
        sessionType = "Coding";

    else
        sessionType = "Heavy Compile";



    const newRecord = {

        timestamp:
            new Date()
                .toISOString(),

        session_type:
            sessionType,

        cpu_intended_load_pct:
            intendedLoad,

        cpu_utilization_pct:
            activeLoad,

        cpu_temperature_c:
            Math.round(
                temperature
            ),

        gpu_temperature_c:
            gpuTemp,

        memory_utilization_pct:
            memoryUsage,

        fan_speed_rpm:
            fanSpeed,

        battery_drain_w:
            power,

        battery_health_pct:
            Number(
                batteryHealth.toFixed(2)
            ),

        disk_health_pct:
            Number(
                diskHealth.toFixed(2)
            ),

        wifi_signal_dbm:
            wifiSignal,

        power_mode:
            powerMode,

        cpu_frequency_ghz:
            cpuFrequency,

        thermal_state:
            thermalState

    };

    telemetry.push(
        newRecord
    );

    if (
        telemetry.length > 500
    ) {

        telemetry.splice(
            0,
            telemetry.length - 500
        );

    }

    fs.writeFileSync(
        outputPath,
        JSON.stringify(
            telemetry,
            null,
            2
        )
    );

}

module.exports = {
    appendTelemetryRecord
};