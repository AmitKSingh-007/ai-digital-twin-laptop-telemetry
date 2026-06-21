
import { useState } from "react";
import api from "../services/api";
import "../styles/AnomalyPanel.css";
import useAutoRefresh from "../utils/autoRefresh";

function AnomalyPanel() {

    const [anomalies, setAnomalies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadAnomalies() {

        try {

            const response =
                await api.get("/anomalies");

            setAnomalies(response.data);
            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Waiting for anomaly detection service..."
            );

        } finally {

            setLoading(false);

        }

    }

    useAutoRefresh(
        loadAnomalies,
        5000
    );

    if (loading) {

        return (
            <div className="anomaly-container">
                <p>Loading anomalies...</p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="anomaly-container">
                <p>{error}</p>
            </div>
        );

    }

    return (

        <div className="anomaly-container">

            <h2 className="anomaly-title">
                Detected Anomalies
            </h2>

            {anomalies.length === 0 ? (

                <div className="anomaly-card">
                    <h3>✅ No Active Anomalies</h3>
                    <p>
                        System is operating normally.
                    </p>
                </div>

            ) : (

                <div className="anomaly-grid">

                    {anomalies.map(
                        (anomaly, index) => (

                            <div
                                key={index}
                                className="anomaly-card"
                            >

                                <h3>
                                    {anomaly.type}
                                </h3>

                                <div
                                    className={`severity ${anomaly.severity.toLowerCase()}`}
                                >
                                    {anomaly.severity}
                                </div>

                                <p>
                                    {anomaly.message}
                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}

export default AnomalyPanel;

