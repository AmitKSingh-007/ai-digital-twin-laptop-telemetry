import { useState } from "react";

import api from "../services/api";

import "../styles/HealthOverviewPanel.css";

import useAutoRefresh from "../utils/autoRefresh";

function HealthOverviewPanel() {

    const [battery, setBattery] =
        useState(null);

    const [disk, setDisk] =
        useState(null);

    const [temperature, setTemperature] =
        useState(null);

    const [anomalies, setAnomalies] =
        useState([]);

    async function loadData() {

        try {

            const batteryResponse =
                await api.get(
                    "/predictions/battery"
                );

            const diskResponse =
                await api.get(
                    "/predictions/disk"
                );

            const temperatureResponse =
                await api.get(
                    "/predictions/temperature"
                );

            const anomalyResponse =
                await api.get(
                    "/anomalies"
                );

            setBattery(
                batteryResponse.data
            );

            setDisk(
                diskResponse.data
            );

            setTemperature(
                temperatureResponse.data
            );

            setAnomalies(
                anomalyResponse.data
            );

        } catch (error) {

            console.error(error);

        }
    }

    useAutoRefresh(
        loadData,
        5000
    );

    if (
        !battery ||
        !disk ||
        !temperature
    ) {

        return <p>Loading...</p>;

    }

    let healthScore = 100;

    healthScore -= anomalies.length * 2;

    if (temperature.risk === "HIGH")
        healthScore -= 15;

    if (battery.risk === "HIGH")
        healthScore -= 10;

    if (disk.risk === "HIGH")
        healthScore -= 10;

    healthScore = Math.max(
        0,
        Math.round(healthScore)
    );

    let overallStatus = "HEALTHY";

    if (battery.risk === "HIGH" || disk.risk === "HIGH" || temperature.risk === "HIGH") {

        overallStatus = "WARNING";

    }

    let scoreColor = "#10b981";

    if (healthScore < 90)
        scoreColor = "#f59e0b";

    if (healthScore < 70)
        scoreColor = "#ef4444";

    return (

        <div className="health-card">

            <div className="health-score" style={{
                borderColor: scoreColor
            }}>

                <div className="score-number" style={{
                    color: scoreColor
                }}>
                    {healthScore}
                </div>

                <div className="score-total">
                    /100
                </div>

            </div>

            <h3
                style={{
                    color: scoreColor
                }}
            >
                {overallStatus}
            </h3>

            <div className="health-details">

                <p>
                    Battery Health:
                    {battery.risk === "LOW"
                        ? " Excellent"
                        : " Warning"}
                </p>

                <p>
                    Disk Health:
                    {disk.risk === "LOW"
                        ? " Excellent"
                        : " Warning"}
                </p>

                <p>
                    Thermal Health:
                    {temperature.risk === "LOW"
                        ? " Good"
                        : " Warning"}
                </p>

                <p>
                    Active Anomalies: {anomalies.length}
                </p>

            </div>

        </div >

    );

}

export default HealthOverviewPanel;