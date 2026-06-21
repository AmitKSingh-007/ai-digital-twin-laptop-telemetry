
import { useState } from "react";
import api from "../services/api";
import "../styles/DashboardCharts.css";
import useAutoRefresh from "../utils/autoRefresh";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DashboardCharts() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadHistory() {

        try {

            const response =
                await api.get("/telemetry/history");

            setHistory(response.data);
            setError("");

        } catch (error) {

            console.error(error);
            setError(
                "Waiting for telemetry history from backend..."
            );

        } finally {

            setLoading(false);

        }

    }

    useAutoRefresh(
        loadHistory,
        5000
    );

    if (loading) {
        return (
            <div className="charts-container">
                <h2>Loading charts...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="charts-container">
                <h2>{error}</h2>
            </div>
        );
    }

    return (

        <div className="charts-container">

            <div
                style={{
                    width: "100%",
                    margin: "0"
        }}
            >

                <h2>
                    CPU Temperature Trend
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart
                        data={history}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            tick={false}
                        />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="cpu_temperature_c"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <div className="secondary-charts">

                <div className="chart-card">

                    <h2>
                        CPU Load Trend
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={200}
                    >

                        <LineChart
                            data={history}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis hide />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="cpu_utilization_pct"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={false}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                <div className="chart-card">

                    <h2>
                        Memory Usage Trend
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={200}
                    >

                        <LineChart
                            data={history}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis hide />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="memory_utilization_pct"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                dot={false}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;

