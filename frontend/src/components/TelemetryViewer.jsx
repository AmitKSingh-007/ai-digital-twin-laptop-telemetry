
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TelemetryViewer.css";

function TelemetryViewer() {
    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const loadTelemetry = async () => {
            try {
                const response = await api.get(
                    "/telemetry/latest"
                );

                setTelemetry(response.data);
                setLastUpdated(
                    new Date().toLocaleTimeString()
                );
                setError("");
            } catch (err) {
                console.error(err);
                setError(
                    "Waiting for telemetry service..."
                );
            } finally {
                setLoading(false);
            }
        };

        loadTelemetry();

        const interval = setInterval(
            loadTelemetry,
            5000
        );

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="loading-text">
                Loading telemetry...
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-text">
                {error}
            </div>
        );
    }

    return (
        <div className="telemetry-viewer">
            <h2>Current Telemetry</h2>

            <p className="last-updated">
                Last Updated: {lastUpdated}
            </p>

            {telemetry && (
                <div className="telemetry-card">

                    <div className="metric-card">
                        <h3>CPU Temperature</h3>
                        <p
                            style={{
                                color:
                                    telemetry.cpu_temperature_c > 80
                                        ? "#ef4444"
                                        : "#22c55e"
                            }}
                        >
                            {telemetry.cpu_temperature_c}°C
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>CPU Load</h3>
                        <p>
                            {telemetry.cpu_utilization_pct}%
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Memory Usage</h3>
                        <p>
                            {telemetry.memory_utilization_pct}%
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>GPU Temperature</h3>
                        <p>
                            {telemetry.gpu_temperature_c}°C
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Fan Speed</h3>
                        <p>
                            {telemetry.fan_speed_rpm} RPM
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Battery Health</h3>
                        <p
                            style={{
                                color:
                                    telemetry.battery_health_pct < 50
                                        ? "#ef4444"
                                        : "#22c55e"
                            }}
                        >
                            {telemetry.battery_health_pct}%
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Disk Health</h3>
                        <p>
                            {telemetry.disk_health_pct}%
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Power Mode</h3>
                        <p>
                            {telemetry.power_mode}
                        </p>
                    </div>

                    <div className="metric-card">
                        <h3>Thermal State</h3>
                        <p>
                            {telemetry.thermal_state}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default TelemetryViewer;

