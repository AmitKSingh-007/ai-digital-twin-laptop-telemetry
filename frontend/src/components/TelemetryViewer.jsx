import { useState } from "react";

import api from "../services/api";

import "../styles/TelemetryViewer.css";

import useAutoRefresh from "../utils/autoRefresh";

function TelemetryViewer() {

    const [telemetry, setTelemetry] =
        useState(null);

    const [show, setShow] =
        useState(false);

    async function loadTelemetry() {

        try {

            const response =
                await api.get(
                    "/telemetry/latest"
                );

            setTelemetry(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    }

    useAutoRefresh(
        loadTelemetry,
        5000
    );

    return (

        <div className="telemetry-viewer">

            <button className="telemetry-button"
                onClick={() =>
                    setShow(!show)
                }
            >

                {
                    show
                        ? "Hide Telemetry"
                        : "Inspect Live Telemetry"
                }

            </button>

            {
                show &&
                telemetry && (

                    <div
                        className="telemetry-card"
                    >

                        <h2>
                            Current Telemetry
                        </h2>

                        <p>
                            CPU Temp:
                            {telemetry.cpu_temperature_c}°C
                        </p>

                        <p>
                            CPU Load:
                            {telemetry.cpu_utilization_pct}%
                        </p>

                        <p>
                            Memory:
                            {telemetry.memory_utilization_pct}%
                        </p>

                        <p>
                            WiFi Signal:
                            {telemetry.wifi_signal_dbm} dBm
                        </p>

                        <p>
                            GPU Temp:
                            {telemetry.gpu_temperature_c}°C
                        </p>

                        <p>
                            Fan Speed:
                            {telemetry.fan_speed_rpm} RPM
                        </p>

                        <p>
                            Battery Health:
                            {telemetry.battery_health_pct}%
                        </p>

                        <p>
                            Disk Health:
                            {telemetry.disk_health_pct}%
                        </p>

                        <p>
                            Power Mode:
                            {telemetry.power_mode}
                        </p>

                        <p>
                            Thermal State:
                            {telemetry.thermal_state}
                        </p>

                    </div>

                )
            }

        </div>

    );

}

export default TelemetryViewer;