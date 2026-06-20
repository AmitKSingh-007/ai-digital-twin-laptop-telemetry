const telemetryService = require("../services/telemetryService");

const { calculatePower, updateTemperature, applyThermalThrottling, HARDWARE } = require("../config/telemetryUtils");

const { getRisk, getThermalState } = require("./simulationUtils");

function simulateHeavyCompile(load = 85) {

    const latest = telemetryService.getLatestTelemetry();

    let currentTemp = latest.cpu_temperature_c;

    const simulation = [];

    for (let minute = 1; minute <= 10; minute++) {

        const intendedLoad = load;

        const activeLoad = applyThermalThrottling(intendedLoad, currentTemp);

        const power = calculatePower(activeLoad);

        currentTemp = updateTemperature(currentTemp, power);

        simulation.push({

            minute,

            intended_load_pct:
                intendedLoad,

            active_load_pct:
                activeLoad,

            cpu_temperature_c:
                Math.round(
                    currentTemp
                ),

            thermal_throttling:
                activeLoad < intendedLoad

        });

    }

    const finalTemp = Math.round(currentTemp);

    const risk = getRisk(finalTemp);

    const thermalState = getThermalState(finalTemp);

    return {

        scenario:
            "Heavy Compile",

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

module.exports = { simulateHeavyCompile };