import { useState } from "react";

import api from "../services/api";

import "../styles/TwinStatus.css";

import useAutoRefresh from "../utils/autoRefresh";

import {
    FaMicrochip,
    FaTachometerAlt,
    FaBatteryFull,
    FaHdd,
    FaShieldAlt,
    FaWifi
}
    from "react-icons/fa";

function TwinStatus() {

    const [telemetry, setTelemetry] = useState(null);

    async function loadTelemetry() {


        try {

            const response =
                await api.get("/telemetry/latest");

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

    if (!telemetry) {

        return <p>Loading...</p>;

    }

    function getWifiStatus(signal) {

        if (signal >= -60) {

            return "Excellent";

        }

        if (signal >= -75) {

            return "Good";

        }

        return "Weak";

    }

    return (

        <div className="status-container">

            <div className="status-header">

                <h2 className="status-title">
                    Current System Status
                </h2>

                <p className="status-subtitle">
                    Real-time laptop telemetry
                </p>

            </div>

            <div className="status-grid">

                <div className="status-card">
                    <h3>
                        <FaMicrochip />
                        CPU Temp
                    </h3>
                    <p className="status-value cpu-value">
                        {telemetry.cpu_temperature_c}°C
                    </p>
                </div>

                <div className="status-card">
                    <h3>
                        <FaTachometerAlt />
                        CPU Load
                    </h3>
                    <p className="status-value load-value">
                        {telemetry.cpu_utilization_pct}%
                    </p>
                </div>

                <div className="status-card">
                    <h3>
                        <FaBatteryFull />
                        Battery
                    </h3>
                    <p className="status-value load-value">
                        {telemetry.battery_health_pct}%
                    </p>
                </div>

                <div className="status-card">
                    <h3>
                        <FaHdd />
                        Disk
                    </h3>
                    <p className="status-value disk-value">
                        {telemetry.disk_health_pct}%
                    </p>
                </div>

                <div className="status-card">

                    <h3>
                        <FaWifi />
                        WiFi
                    </h3>

                    <div className="wifi-value">

                        {telemetry.wifi_signal_dbm}dBm

                    </div>

                    <div className="wifi-status">

                        {
                            getWifiStatus(
                                telemetry.wifi_signal_dbm
                            )
                        }

                    </div>

                </div>

                <div className="status-card">
                    <h3>
                        <FaShieldAlt />
                        Thermal
                    </h3>

                    <p
                        className={
                            `status-value ${telemetry.thermal_state.toLowerCase()}`
                        }
                    >
                        {telemetry.thermal_state}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default TwinStatus;