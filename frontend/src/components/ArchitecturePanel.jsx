import "../styles/ArchitecturePanel.css";

function ArchitecturePanel() {

    return (

        <div className="architecture-container">

            <h2>
                How The Digital Twin Works
            </h2>

            <div className="architecture-card">

                <h3>
                    Telemetry Generation
                </h3>

                <p>
                    Session Type
                    → CPU Load
                    → Power Consumption
                    → Temperature
                    → Fan Speed
                    → Battery Drain
                </p>

                <p>
                    Telemetry values are generated
                    using hardware-inspired
                    relationships rather than
                    random independent values.
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    Anomaly Detection
                </h3>

                <p>
                    Telemetry
                    → Rule Engine
                    → Thermal Throttling
                    → Fan Overuse
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    Prediction Engine
                </h3>

                <p>
                    Historical Telemetry
                    → Battery Prediction
                    → Temperature Prediction
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    Simulation Engine
                </h3>

                <p>
                    Fan Failure
                    • Desert Heat
                    • Heavy Compile
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    AI Digital Twin
                </h3>

                <p>
                    Telemetry +
                    Predictions +
                    Anomalies +
                    Simulations
                    → AI Assistant
                </p>

            </div>

        </div>

    );

}

export default ArchitecturePanel;