const HARDWARE = {

    AMBIENT_TEMP: 38,

    THERMAL_INERTIA: 0.12,

    FAN_ON_TEMP: 76,

    FAN_OFF_TEMP: 64,

    THROTTLE_TEMP: 92,

    LOW_FAN_SPEED: 1600,

    HIGH_FAN_SPEED: 4600,

    INITIAL_BATTERY_HEALTH: 96.5,

    INITIAL_DISK_HEALTH: 99.0,

    MAX_MEMORY_USAGE: 95,

    MIN_MEMORY_USAGE: 35,

    MIN_WIFI_SIGNAL: -60,

    MAX_WIFI_SIGNAL: -35,

    FAN_FAILURE_HEAT_FACTOR: 1.5,

    THROTTLE_TEMP: 92,

    CRITICAL_TEMP: 105

};

const WORKLOADS = {

    IDLE: {
        min: 5,
        max: 15
    },

    BROWSING: {
        min: 20,
        max: 40
    },

    CODING: {
        min: 40,
        max: 70
    },

    HEAVY_COMPILE: {
        min: 80,
        max: 100
    }

};

function randomBetween(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function generateWorkload() {

    const r = Math.random();

    if (r < 0.25) {

        return randomBetween(
            WORKLOADS.IDLE.min,
            WORKLOADS.IDLE.max
        );

    }

    if (r < 0.50) {

        return randomBetween(
            WORKLOADS.BROWSING.min,
            WORKLOADS.BROWSING.max
        );

    }

    if (r < 0.80) {

        return randomBetween(
            WORKLOADS.CODING.min,
            WORKLOADS.CODING.max
        );

    }

    return randomBetween(
        WORKLOADS.HEAVY_COMPILE.min,
        WORKLOADS.HEAVY_COMPILE.max
    );

}

function calculatePower(load) {

    return Number(
        (
            4.5 +
            Math.pow(load / 18, 2.3)
        ).toFixed(2)
    );

}

function updateTemperature(
    currentTemp,
    power
) {

    const equilibriumTemp =
        HARDWARE.AMBIENT_TEMP +
        power * 1.6;

    return currentTemp +
        (
            equilibriumTemp -
            currentTemp
        ) *
        HARDWARE.THERMAL_INERTIA;

}

function updateFanState(
    temp,
    fanHigh
) {

    if (
        !fanHigh &&
        temp > HARDWARE.FAN_ON_TEMP
    ) {

        fanHigh = true;

    }

    else if (
        fanHigh &&
        temp < HARDWARE.FAN_OFF_TEMP
    ) {

        fanHigh = false;

    }

    return fanHigh;

}


function applyThermalThrottling(
    load,
    temp
) {

    if (
        temp >= HARDWARE.THROTTLE_TEMP
    ) {

        return Math.floor(
            load * 0.35
        );

    }

    return load;

}

module.exports = {
    HARDWARE,
    WORKLOADS,
    randomBetween,
    generateWorkload,
    calculatePower,
    updateTemperature,
    updateFanState,
    applyThermalThrottling
};