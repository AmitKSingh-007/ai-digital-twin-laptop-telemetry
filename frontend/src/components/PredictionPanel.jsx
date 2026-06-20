import { useState } from "react";

import api from "../services/api";

import "../styles/PredictionPanel.css";

import useAutoRefresh from "../utils/autoRefresh";


function PredictionPanel() {

    const [battery, setBattery] =
        useState(null);

    const [temperature, setTemperature] =
        useState(null);

    const [disk, setDisk] =
        useState(null);

    async function loadPredictions() {

        try {

            const batteryResponse =
                await api.get(
                    "/predictions/battery"
                );

            const temperatureResponse =
                await api.get(
                    "/predictions/temperature"
                );

            const diskResponse =
                await api.get(
                    "/predictions/disk"
                );

            setBattery(
                batteryResponse.data
            );

            setTemperature(
                temperatureResponse.data
            );

            setDisk(
                diskResponse.data
            );

        } catch (error) {

            console.error(error);

        }

    }

    useAutoRefresh(
        loadPredictions,
        5000
    );


    if (
        !battery ||
        !temperature ||
        !disk
    ) {

        return <p>Loading predictions...</p>;

    }

    return (

        <div className="prediction-container">

            <h2 className="prediction-title">
                Predictions
            </h2>

            <div className="prediction-grid">

                <div className="prediction-card">

                    <h3>Battery</h3>

                    <div className="prediction-value">
                        {battery.predicted_health_30_days}%
                    </div>

                    <div className="prediction-risk risk-low">
                        Risk: {battery.risk}
                    </div>

                </div>

                <div className="prediction-card">

                    <h3>Temperature</h3>

                    <div className="prediction-value">
                        {temperature.predicted_temperature_10min}°C
                    </div>

                    <div className="prediction-trend">
                        {temperature.trend}
                    </div>

                </div>

                <div className="prediction-card">

                    <h3>Disk</h3>

                    <div className="prediction-value">
                        {disk.predicted_health_30_days}%
                    </div>

                    <div className="prediction-risk risk-low">
                        Risk: {disk.risk}
                    </div>

                </div>

            </div>

        </div>

    );

}

export default PredictionPanel;