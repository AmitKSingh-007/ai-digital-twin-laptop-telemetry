const telemetryService = require("../services/telemetryService");

const { calculatePower, updateTemperature, applyThermalThrottling, HARDWARE } = require("../config/telemetryUtils");

const { getRisk, getThermalState } = require("./simulationUtils");

function simulateFanFailure(load = 90) {

    const latest = telemetryService.getLatestTelemetry();

    let currentTemp = latest.cpu_temperature_c;

    const simulation = [];

    for (let minute = 1; minute <= 10; minute++) {

        const intendedLoad = load;

        const activeLoad = applyThermalThrottling(intendedLoad, currentTemp);

        const power = calculatePower(activeLoad);

        const effectivePower = power * HARDWARE.FAN_FAILURE_HEAT_FACTOR;

        currentTemp = updateTemperature(currentTemp, effectivePower);  //heat accumulation due to fan

        simulation.push({

            minute,

            intended_load_pct:
                intendedLoad,

            active_load_pct:
                activeLoad,

            cpu_temperature_c:
                Math.round(currentTemp),

            thermal_throttling:
                activeLoad < intendedLoad
        });
    }

    const finalTemp = Math.round(currentTemp);

    const risk = getRisk(finalTemp);

    const thermalState = getThermalState(finalTemp);

    return {

        scenario:
            "Cooling Fan Failure",

        starting_temperature_c:
            latest.cpu_temperature_c,

        predicted_temperature_c:
            finalTemp,

        thermal_state:
            thermalState,

        risk,

        timeline:
            simulation

    };

}

module.exports = { simulateFanFailure };