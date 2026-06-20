
const fs = require("fs");
const path = require("path");

const {
    HARDWARE,
    WORKLOADS,
    generateWorkload,
    calculatePower,
    updateTemperature,
    updateFanState,
    applyThermalThrottling,
    randomBetween
} = require("../config/telemetryUtils");

function generateTelemetry(minutes = 120) {

    const history = [];

    let currentTemp =
        HARDWARE.AMBIENT_TEMP;

    let fanHigh = false;

    let batteryHealth =
        HARDWARE.INITIAL_BATTERY_HEALTH;

    let diskHealth =
        HARDWARE.INITIAL_DISK_HEALTH;

    const now = new Date();

    function getSessionLoad(minute) {

        // Idle
        if (minute < 10) {

            return randomBetween(
                WORKLOADS.IDLE.min,
                WORKLOADS.IDLE.max
            );

        }

        // Browsing
        if (minute < 30) {

            return randomBetween(
                WORKLOADS.BROWSING.min,
                WORKLOADS.BROWSING.max
            );

        }

        // Coding
        if (minute < 55) {

            return randomBetween(
                WORKLOADS.CODING.min,
                WORKLOADS.CODING.max
            );

        }

        // Heavy Compile
        if (minute < 75) {

            return randomBetween(
                WORKLOADS.HEAVY_COMPILE.min,
                WORKLOADS.HEAVY_COMPILE.max
            );

        }

        // Cool Down
        if (minute < 90) {

            return randomBetween(
                WORKLOADS.IDLE.min,
                WORKLOADS.BROWSING.min
            );

        }

        // Mixed Usage
        return generateWorkload();
    }

    for (let i = 0; i < minutes; i++) {

        const timestamp =
            new Date(
                now.getTime() -
                (minutes - i) * 60000
            ).toISOString();

        let sessionType;

        if (i < 10)
            sessionType = "Idle";
        else if (i < 30)
            sessionType = "Browsing";
        else if (i < 55)
            sessionType = "Coding";
        else if (i < 75)
            sessionType = "Heavy Compile";
        else if (i < 90)
            sessionType = "Cool Down";
        else
            sessionType = "Mixed";

        const intendedLoad =
            getSessionLoad(i);

        const activeLoad =
            applyThermalThrottling(
                intendedLoad,
                currentTemp
            );

        const batteryDrain =
            calculatePower(
                activeLoad
            );

        currentTemp =
            updateTemperature(
                currentTemp,
                batteryDrain
            );

        fanHigh =
            updateFanState(
                currentTemp,
                fanHigh
            );

        const fanSpeed =
            fanHigh
                ? HARDWARE.HIGH_FAN_SPEED
                : HARDWARE.LOW_FAN_SPEED;

        if (currentTemp > 80) {

            batteryHealth = Math.max(
                0,
                batteryHealth - 0.015
            );

            diskHealth = Math.max(
                0,
                diskHealth - 0.005
            );
        }

        const gpuTemp =
            Math.max(
                30,
                Math.round(
                    currentTemp -
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
            wifiSignal -= randomBetween(2, 5);
        }

        wifiSignal = Math.max(
            -75,
            wifiSignal
        );

        const cpuFrequency =
            Number(
                (
                    1.2 +
                    (activeLoad / 100) * 3.4
                ).toFixed(2)
            );

        const powerMode =
            cpuFrequency >= 3.5
                ? "Performance"
                : cpuFrequency >= 2.0
                    ? "Balanced"
                    : "Power Saver";


        let thermalState = "NORMAL";

        if (currentTemp >= HARDWARE.THROTTLE_TEMP) {

            thermalState = "THROTTLING";

        }
        else if (currentTemp >= 80) {

            thermalState = "WARNING";

        }

        history.push({

            timestamp,

            session_type:
                sessionType,

            cpu_intended_load_pct:
                intendedLoad,

            cpu_utilization_pct:
                activeLoad,

            cpu_temperature_c:
                Math.round(currentTemp),

            gpu_temperature_c:
                gpuTemp,

            memory_utilization_pct:
                memoryUsage,

            fan_speed_rpm:
                fanSpeed,

            battery_drain_w:
                batteryDrain,

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
        });
    }

    const outputPath =
        path.join(
            __dirname,
            "telemetry.json"
        );

    fs.writeFileSync(
        outputPath,
        JSON.stringify(
            history,
            null,
            2
        )
    );

    console.log(
        `Telemetry generated successfully. Records: ${history.length}`
    );
}

generateTelemetry();
