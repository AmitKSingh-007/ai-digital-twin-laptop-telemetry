import { useState } from "react";

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

import RawTelemetryViewer from "../components/RawTelemetryViewer";

import "../styles/Dashboard.css";

function Dashboard() {

    const [activeTab, setActiveTab] = useState("dashboard");

    return (

        <div className="dashboard">

            <h1>
                Laptop Digital Twin
            </h1>

            <p className="dashboard-subtitle">
                AI-powered telemetry, prediction and simulation platform
            </p>

            <div className="tab-bar">

                <button
                    onClick={() =>
                        setActiveTab("dashboard")
                    }
                >
                    Dashboard
                </button>

                <button
                    onClick={() =>
                        setActiveTab("analytics")
                    }
                >
                    Analytics
                </button>

                <button
                    onClick={() =>
                        setActiveTab("simulations")
                    }
                >
                    Simulations
                </button>

                <button
                    onClick={() =>
                        setActiveTab("assistant")
                    }
                >
                    AI Assistant
                </button>

            </div>

            {
                activeTab === "dashboard" && (

                    <div className="dashboard-section">

                        <TwinStatus />

                        <TelemetryViewer />

                        <SystemSummaryPanel />

                        <HealthOverviewPanel />

                    </div>

                )
            }

            {
                activeTab === "analytics" && (

                    <div className="dashboard-section">

                        <ArchitecturePanel />

                        <h1 className="section-title">
                            Historical Telemetry
                        </h1>

                        <DashboardCharts />

                        <PredictionPanel />

                        <AnomalyPanel />

                        <RawTelemetryViewer />

                    </div>

                )
            }

            {
                activeTab === "simulations" && (

                    <div className="dashboard-section">

                        <SimulationPanel />

                    </div>

                )
            }

            {
                activeTab === "assistant" && (

                    <div className="dashboard-section">

                        <ChatPanel />

                    </div>

                )
            }

        </div>

    );

}

export default Dashboard;