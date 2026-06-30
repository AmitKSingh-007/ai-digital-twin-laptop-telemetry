const express = require("express");

const cors = require("cors");

const telemetryRoutes = require("./routes/telemetry");

const simulationRoutes = require("./routes/simulation");

const predictionRoutes = require("./routes/prediction");

const anomalyRoutes = require("./routes/anomaly");

const chatRoutes = require("./routes/chat");

const { appendTelemetryRecord } = require("./data/liveTelemetry");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/telemetry", telemetryRoutes);

app.use("/api/simulations", simulationRoutes);

app.use("/api/predictions", predictionRoutes);

app.use("/api/anomalies", anomalyRoutes);

app.use("/api/chat", chatRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    console.log(
        "Live telemetry stream started"
    );
    
    setInterval(() => {

        appendTelemetryRecord();

    }, 5000);
});