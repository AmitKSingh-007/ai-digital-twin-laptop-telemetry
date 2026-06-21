
import { useState } from "react";
import api from "../services/api";
import "../styles/PredictionPanel.css";
import useAutoRefresh from "../utils/autoRefresh";

function PredictionPanel() {

    const [battery, setBattery] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [disk, setDisk] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadPredictions() {

        try {

            const [
                batteryResponse,
                temperatureResponse,
                diskResponse
            ] = await Promise.all([
                api.get("/predictions/battery"),
                api.get("/predictions/temperature"),
                api.get("/predictions/disk")
            ]);

            setBattery(batteryResponse.data);
            setTemperature(
                temperatureResponse.data
            );
            setDisk(diskResponse.data);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Waiting for prediction service..."
            );

        } finally {

            setLoading(false);

        }

    }

    useAutoRefresh(
        loadPredictions,
        5000
    );

    if (loading) {

        return (
            <div className="prediction-container">
                <p>Loading predictions...</p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="prediction-container">
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className="prediction-container">

            <h2 className="prediction-title">
                AI Predictions
            </h2>

            <div className="prediction-grid">

                <div className="prediction-card">

                    <h3>Battery</h3>

                    <div className="prediction-value">
                        {battery.predicted_health_30_days}%
                    </div>

                    <div
                        className="prediction-risk"
                        style={{
                            color:
                                battery.risk === "HIGH"
                                    ? "#ef4444"
                                    : "#22c55e"
                        }}
                    >
                        Risk: {battery.risk}
                    </div>

                </div>

                <div className="prediction-card">

                    <h3>Temperature</h3>

                    <div className="prediction-value">
                        {temperature.predicted_temperature_10min}°C
                    </div>

                    <div
                        className="prediction-trend"
                        style={{
                            color:
                                temperature.trend === "RISING"
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {temperature.trend}
                    </div>

                </div>

                <div className="prediction-card">

                    <h3>Disk</h3>

                    <div className="prediction-value">
                        {disk.predicted_health_30_days}%
                    </div>

                    <div
                        className="prediction-risk"
                        style={{
                            color:
                                disk.risk === "HIGH"
                                    ? "#ef4444"
                                    : "#22c55e"
                        }}
                    >
                        Risk: {disk.risk}
                    </div>

                </div>

            </div>

        </div>

    );

}

export default PredictionPanel;

