function getRisk(finalTemp) {

    let risk = "LOW";

    if (finalTemp >= 90) {

        risk = "HIGH";

    } else if (finalTemp >= 80) {

        risk = "MEDIUM";

    }

    return risk;
}

function getThermalState(finalTemp) {

    let thermalState = "NORMAL";

    if (finalTemp >= 92) {

        thermalState = "THROTTLING";

    }
    else if (finalTemp >= 80) {

        thermalState = "WARNING";

    }

    return thermalState;

}

module.exports = { getRisk, getThermalState };