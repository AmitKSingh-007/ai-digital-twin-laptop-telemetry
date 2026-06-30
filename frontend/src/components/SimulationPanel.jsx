import { useState } from "react";

import api from "../services/api";

import "../styles/SimulationPanel.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function SimulationPanel() {

    const [result, setResult] =
        useState(null);

    const [activeSimulation,
        setActiveSimulation] =
        useState(null);

    async function runSimulation(endpoint) {

        try {

            const response =
                await api.get(endpoint);

            if (
                endpoint ===
                "/simulations/reset"
            ) {

                setActiveSimulation(
                    null
                );

                setResult(
                    null
                );

                return;

            }

            setActiveSimulation(
                endpoint
            );

            setResult(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="simulation-container">

            <h2 className="simulation-title">
                Simulation Lab
            </h2>

            <div className="simulation-buttons">

                <button
                    onClick={() =>
                        runSimulation(
                            "/simulations/fan-failure"
                        )
                    }
                >
                    Fan Failure
                </button>

                <button
                    onClick={() =>
                        runSimulation(
                            "/simulations/desert-heat"
                        )
                    }
                >
                    Desert Heat
                </button>

                <button
                    onClick={() =>
                        runSimulation(
                            "/simulations/heavy-compile"
                        )
                    }
                >
                    Heavy Compile
                </button>

                <button
                    className="reset-button"
                    onClick={() =>
                        runSimulation(
                            "/simulations/reset"
                        )
                    }
                >
                    Reset Simulation
                </button>

            </div>

            {result && (

                <div className="simulation-result">

                    <h3>
                        {result.scenario}
                    </h3>

                    <div className="simulation-summary">

                        <div className="simulation-metric">
                            <span>Temperature</span>
                            <strong>
                                {result.predicted_temperature_c}°C
                            </strong>
                        </div>

                        <div className="simulation-metric">
                            <span>Risk</span>
                            <strong>
                                {result.risk}
                            </strong>
                        </div>

                        <div className="simulation-metric">
                            <span>Thermal State</span>
                            <strong>
                                {result.thermal_state}
                            </strong>
                        </div>

                    </div>

                    <h4>
                        <p className="simulation-description">
                            Forecast based on current system state for the next 10 minutes
                        </p>
                    </h4>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={result.timeline}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="minute"
                            />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="cpu_temperature_c"
                                stroke="#3b82f6"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

}

export default SimulationPanel;