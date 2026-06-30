let activeSimulation = null;

function setSimulation(mode) {

    activeSimulation = mode;

}

function getSimulation() {

    return activeSimulation;

}

module.exports = {
    setSimulation,
    getSimulation
};