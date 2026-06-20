import { useEffect, useState } from "react";

import api from "../services/api";

import "../styles/HealthOverviewPanel.css";

function HealthOverviewPanel() {

    const [battery, setBattery] =
        useState(null);

    const [disk, setDisk] =
        useState(null);

    const [temperature, setTemperature] =
        useState(null);

    const [anomalies, setAnomalies] =
        useState([]);

    useEffect(() => {

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

        loadData();

    }, []);

    if (
        !battery ||
        !disk ||
        !temperature
    ) {

        return <p>Loading...</p>;

    }

    let overallStatus = "HEALTHY";

    if (battery.risk === "HIGH" || disk.risk === "HIGH" || temperature.risk === "HIGH") {

        overallStatus = "WARNING";

    }

    return (

        <div className="health-container">

            <h2>
                Overall Laptop Health
            </h2>

            <div className="health-card">

                <h3>
                    {overallStatus}
                </h3>

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
                    Active Anomalies:
                    {anomalies.length}
                </p>

            </div>

        </div>

    );

}

export default HealthOverviewPanel;