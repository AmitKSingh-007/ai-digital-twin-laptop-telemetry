import TwinStatus from "../components/TwinStatus";

import DashboardCharts from "../components/DashboardCharts";

import PredictionPanel from "../components/PredictionPanel";

import AnomalyPanel from "../components/AnomalyPanel";

import SimulationPanel from "../components/SimulationPanel";

import ChatPanel from "../components/ChatPanel";

import ArchitecturePanel from "../components/ArchitecturePanel";

import TelemetryViewer from "../components/TelemetryViewer";

import SystemSummaryPanel from "../components/SystemSummaryPanel";

import HealthOverviewPanel from "../components/HealthOverviewPanel";

function Dashboard() {

    return (

        <div className="dashboard">

            <h1>
                Laptop Digital Twin
            </h1>

            <TwinStatus />

            <ArchitecturePanel />

            <TelemetryViewer />

            <SystemSummaryPanel />

            <HealthOverviewPanel />

            <h1 className="section-title"> Historical Telemetry</h1>

            <DashboardCharts />

            <PredictionPanel />

            <AnomalyPanel />

            <SimulationPanel />

            <ChatPanel />

        </div>

    );

}

export default Dashboard;