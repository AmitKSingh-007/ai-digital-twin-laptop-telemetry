import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/SystemSummaryPanel.css";

function SystemSummaryPanel() {

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadSummary() {

            try {

                const response =
                    await api.get(
                        "/telemetry/summary"
                    );
                    console.log(response.data);

                setSummary(
                    response.data
                );

                setError("");

            } catch (error) {

                console.error(error);

                setError(
                    "Waiting for summary service..."
                );

            } finally {

                setLoading(false);

            }

        }

        loadSummary();

    }, []);

    if (loading) {

        return (
            <div className="summary-container">
                <p>Loading system summary...</p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="summary-container">
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className="summary-container">

            <h2>
                System Summary
            </h2>

            <div className="summary-grid">

                <div className="summary-card">
                    <h3>Avg Temperature</h3>

                    <p
                        style={{
                            color:
                                summary.average_temperature_c >= 80
                                    ? "#ef4444"
                                    : summary.average_temperature_c >= 60
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {summary.average_temperature_c}°C
                    </p>

                </div>

                <div className="summary-card">
                    <h3>Max Temperature</h3>

                    <p
                        style={{
                            color:
                                summary.maximum_temperature_c >= 80
                                    ? "#ef4444"
                                    : summary.maximum_temperature_c >= 60
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {summary.maximum_temperature_c}°C
                    </p>

                </div>

                <div className="summary-card">
                    <h3>Avg CPU Load</h3>

                    <p
                        style={{
                            color:
                                summary.average_cpu_load_pct >= 80
                                    ? "#ef4444"
                                    : summary.average_cpu_load_pct >= 50
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {summary.average_cpu_load_pct}%
                    </p>

                </div>

                <div className="summary-card">
                    <h3>Warning Events</h3>

                    <p
                        style={{
                            color:
                                summary.warning_events > 5
                                    ? "#ef4444"
                                    : summary.warning_events > 0
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {summary.warning_events}
                    </p>

                </div>

                <div className="summary-card">
                    <h3>Throttling Events</h3>

                    <p
                        style={{
                            color:
                                summary.throttling_events > 5
                                    ? "#ef4444"
                                    : summary.throttling_events > 0
                                    ? "#f59e0b"
                                    : "#22c55e"
                        }}
                    >
                        {summary.throttling_events}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default SystemSummaryPanel;