import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";

import TwinStatus from "../components/TwinStatus";
import DashboardCharts from "../components/DashboardCharts";
import PredictionPanel from "../components/PredictionPanel";
import AnomalyPanel from "../components/AnomalyPanel";
import SimulationPanel from "../components/SimulationPanel";
import ChatPanel from "../components/ChatPanel";
import SystemSummaryPanel from "../components/SystemSummaryPanel";
import ArchitecturePanel from "../components/ArchitecturePanel";

function Dashboard() {

    return (

        <div className="dashboard">

            <Navbar />

            <div className="dashboard-header">

                <h1>
                    💻 AI Digital Twin For Laptop Telemetry
                </h1>

                <p>
                    Real-time telemetry, predictions,
                    anomaly detection and AI insights
                </p>

            </div>

            <div id="status">
                <TwinStatus />
            </div>

            <div id="architecture">
                <ArchitecturePanel />
            </div>

            <div id="summary">
                <SystemSummaryPanel />
            </div>

            <div id="analytics">
                <DashboardCharts />
            </div>

            <div
                id="predictions"
                className="intelligence-section"
            >

                <PredictionPanel />

                <div id="anomalies">
                    <AnomalyPanel />
                </div>

            </div>

            <div id="simulation">
                <SimulationPanel />
            </div>

            <div id="assistant">
                <ChatPanel />
            </div>

        </div>

    );

}

export default Dashboard;