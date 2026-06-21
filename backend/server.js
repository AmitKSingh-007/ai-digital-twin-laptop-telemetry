
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const telemetryRoutes = require("./routes/telemetry");
const simulationRoutes = require("./routes/simulation");
const predictionRoutes = require("./routes/prediction");
const anomalyRoutes = require("./routes/anomaly");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

console.log(
    "GROQ KEY:",
    process.env.GROQ_API_KEY
        ? "Loaded"
        : "Missing"
);

app.use("/api/telemetry", telemetryRoutes);
app.use("/api/simulations", simulationRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/anomalies", anomalyRoutes);

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("Backend is alive");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});

