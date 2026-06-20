import { useEffect, useState } from "react";

import api from "../services/api";

import "../styles/SystemSummaryPanel.css";

function SystemSummaryPanel() {

    const [summary, setSummary] =
        useState(null);

    useEffect(() => {

        async function loadSummary() {

            try {

                const response =
                    await api.get(
                        "/telemetry/summary"
                    );

                setSummary(
                    response.data
                );

            } catch (error) {

                console.error(error);

            }

        }

        loadSummary();

    }, []);

    if (!summary) {

        return <p>Loading...</p>;

    }

    return (

        <div className="summary-container">

            <h2>
                System Summary
            </h2>

            <div className="summary-grid">

                <div className="summary-card">

                    <h3>
                        Avg Temperature
                    </h3>

                    <p>
                        {summary.average_temperature_c}°C
                    </p>

                </div>

                <div className="summary-card">

                    <h3>
                        Max Temperature
                    </h3>

                    <p>
                        {summary.maximum_temperature_c}°C
                    </p>

                </div>

                <div className="summary-card">

                    <h3>
                        Avg CPU Load
                    </h3>

                    <p>
                        {summary.average_cpu_load_pct}%
                    </p>

                </div>

                <div className="summary-card">

                    <h3>
                        Warning Events
                    </h3>

                    <p>
                        {summary.warning_events}
                    </p>

                </div>

                <div className="summary-card">

                    <h3>
                        Throttling Events
                    </h3>

                    <p>
                        {summary.throttling_events}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default SystemSummaryPanel;