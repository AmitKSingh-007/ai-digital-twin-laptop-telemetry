
import "../styles/ArchitecturePanel.css";

function ArchitecturePanel() {

    return (

        <div className="architecture-container">

            <h2>
                Digital Twin Architecture
            </h2>

            <div className="architecture-card">

                <h3>
                    📡 Telemetry Generation
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
                    Hardware-inspired telemetry generation
                    produces realistic system behavior rather
                    than random independent values.
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    ⚠️ Anomaly Detection
                </h3>

                <p>
                    Telemetry
                    → Rule Engine
                    → Thermal Throttling
                    → Fan Overuse
                    → Abnormal Temperature Rise
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    🔮 Prediction Engine
                </h3>

                <p>
                    Historical Telemetry
                    → Battery Health Prediction
                    → Temperature Forecasting
                    → Component Degradation Analysis
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    🧪 Simulation Engine
                </h3>

                <p>
                    Fan Failure Scenario
                    • Desert Heat Exposure
                    • Heavy Compilation Workload
                    • Thermal Stress Testing
                </p>

            </div>

            <div className="architecture-card">

                <h3>
                    🤖 AI Digital Twin Assistant
                </h3>

                <p>
                    Telemetry +
                    Predictions +
                    Anomalies +
                    Simulations
                    → Intelligent Recommendations
                    → User Queries
                    → System Insights
                </p>

            </div>

        </div>

    );

}

export default ArchitecturePanel;

