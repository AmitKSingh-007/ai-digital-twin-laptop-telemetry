import { useState } from "react";

import api from "../services/api";

import "../styles/AnomalyPanel.css";

import useAutoRefresh from "../utils/autoRefresh";

function AnomalyPanel() {

    const [anomalies, setAnomalies] =
        useState([]);

    async function loadAnomalies() {

        try {

            const response =
                await api.get(
                    "/anomalies"
                );

            setAnomalies(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    }

    useAutoRefresh(
        loadAnomalies,
        5000
    );

    return (

        <div className="anomaly-container">

            <h2 className="anomaly-title">
                Detected Anomalies
            </h2>

            <div className="anomaly-grid">

                {anomalies.map((anomaly, index) => (

                    <div
                        key={index}
                        className="anomaly-card"
                    >

                        <h3>
                            {anomaly.type}
                        </h3>

                        <div
                            className={
                                `severity ${anomaly.severity.toLowerCase()}`
                            }
                        >
                            {anomaly.severity}
                        </div>

                        <p>
                            {anomaly.message}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AnomalyPanel;