
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/HealthOverviewPanel.css";

function HealthOverviewPanel() {

    const [battery, setBattery] = useState(null);
    const [disk, setDisk] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [anomalies, setAnomalies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadData() {

            try {

                const [
                    batteryResponse,
                    diskResponse,
                    temperatureResponse,
                    anomalyResponse
                ] = await Promise.all([
                    api.get("/predictions/battery"),
                    api.get("/predictions/disk"),
                    api.get("/predictions/temperature"),
                    api.get("/anomalies")
                ]);

                setBattery(batteryResponse.data);
                setDisk(diskResponse.data);
                setTemperature(
                    temperatureResponse.data
                );
                setAnomalies(
                    anomalyResponse.data
                );

                setError("");

            } catch (error) {

                console.error(error);

                setError(
                    "Waiting for health prediction service..."
                );

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    if (loading) {

        return (
            <div className="health-container">
                <p>Loading health overview...</p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="health-container">
                <p>{error}</p>
            </div>
        );

    }

    let overallStatus = "HEALTHY";

    if (
        battery?.risk === "HIGH" ||
        disk?.risk === "HIGH" ||
        temperature?.risk === "HIGH"
    ) {

        overallStatus = "WARNING";

    }

    return (

        <div className="health-container">

            <h2>
                Overall Laptop Health
            </h2>

            <div className="health-card">

                <h3
                    style={{
                        color:
                            overallStatus === "HEALTHY"
                                ? "#22c55e"
                                : "#ef4444"
                    }}
                >
                    {overallStatus}
                </h3>

                <p>
                    🔋 Battery Health:
                    {" "}
                    {battery.risk}
                </p>

                <p>
                    💾 Disk Health:
                    {" "}
                    {disk.risk}
                </p>

                <p>
                    🌡 Thermal Health:
                    {" "}
                    {temperature.risk}
                </p>

                <p>
                    ⚠ Active Anomalies:
                    {" "}
                    {anomalies.length}
                </p>

            </div>

        </div>

    );

}

export default HealthOverviewPanel;

