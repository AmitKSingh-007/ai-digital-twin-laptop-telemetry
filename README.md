# AI Digital Twin for Laptop Telemetry

An intelligent Digital Twin platform that models laptop behavior using telemetry, predictive analytics, simulation, anomaly detection, and conversational AI.

## Overview

Traditional monitoring tools only display current system metrics. They cannot answer questions such as:

* Why is my laptop running hot?
* Will my battery degrade soon?
* What happens if the cooling fan fails?
* Can my laptop safely handle a heavy workload?
* What risks exist under extreme environmental conditions?

AI Digital Twin for Laptop Telemetry addresses these challenges by combining telemetry generation, predictive analytics, simulation, anomaly detection, and AI reasoning into a single platform.

The system continuously creates a virtual representation (Digital Twin) of a laptop and helps users understand, predict, and simulate system behavior.

---

## Key Features

### Telemetry Generation Engine

Generates realistic correlated laptop telemetry including:

* CPU Utilization
* CPU Temperature
* GPU Temperature
* Memory Usage
* Fan Speed
* Battery Health
* Disk Health
* WiFi Signal Strength
* CPU Frequency
* Thermal State

Unlike random telemetry generation, the system models realistic hardware relationships.

Example:

CPU Load ↑
→ Power Consumption ↑
→ Temperature ↑
→ Fan Speed ↑
→ Battery Drain ↑

---

### Anomaly Detection Engine

Detects abnormal system behavior.

Implemented anomalies:

* Thermal Throttling
* Fan Overuse

Outputs:

* Severity Level
* Event Count
* Explanation

---

### Prediction Engine

Predicts future system health using historical telemetry.

#### Battery Health Prediction

Predicts battery degradation over the next 30 days.

#### Temperature Prediction

Predicts CPU temperature over the next 10 minutes.

#### Disk Health Prediction

Predicts future storage health.

---

### Simulation Engine

Provides what-if analysis through interactive simulations.

Implemented scenarios:

#### Cooling Fan Failure

Predicts thermal behavior if the cooling fan fails.

#### Desert Heat

Simulates laptop operation in extremely high ambient temperatures.

#### Heavy Compile / Gaming

Simulates resource-intensive workloads and their thermal impact.

---

### AI Digital Twin Assistant

Powered by a Large Language Model (LLM).

The AI assistant reasons over:

* Current Telemetry
* Historical Trends
* Predictions
* Anomalies
* Simulation Results

Example Questions:

* Why is my laptop hot?
* Will my battery degrade?
* Explain detected anomalies.
* What happens if the cooling fan fails?
* What happens if I start gaming now?

Responses include:

* Explanation
* Root Cause
* Recommendation

---

## Architecture

Telemetry Engine
↓
Anomaly Detection Engine
↓
Prediction Engine
↓
Simulation Engine
↓
AI Reasoning Engine
↓
Dashboard + Conversational Interface

---

## Dashboard Components

### Current Status

Displays:

* CPU Temperature
* CPU Load
* Battery Health
* Disk Health
* Thermal State

### Historical Telemetry Charts

Visualizes:

* Temperature Trends
* CPU Utilization Trends
* Resource Usage History

### Predictions

Displays:

* Battery Health Forecast
* Temperature Forecast
* Disk Health Forecast

### Anomalies

Displays detected system anomalies and severity levels.

### Simulation Lab

Runs interactive what-if scenarios.

### AI Assistant

Provides conversational diagnostics and recommendations.

---

## Technology Stack

### Frontend

* React.js
* Axios
* Recharts

### Backend

* Node.js
* Express.js

### AI

* Groq API
* LLM-based reasoning

### Storage

* JSON-based telemetry storage

---

## Project Structure

```text
backend/
├── controllers/
├── routes/
├── services/
├── simulators/
├── predictors/
├── detectors/
├── twin/
└── data/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── services/
└── public/

docs/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/AmitKSingh-007/ai-digital-twin-laptop-telemetry.git
cd ai-digital-twin-laptop-telemetry
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* Live Telemetry Streaming
* Simulation-Driven Dashboard Updates
* Health Score System
* Cloud Deployment
* PDF Health Reports
* Additional Simulation Scenarios
* Machine Learning Based Predictive Models

---

## Key Innovations

* Relationship-Based Telemetry Generation
* Explainable AI Diagnostics
* Predictive Health Monitoring
* Interactive What-If Simulations
* Digital Twin Architecture
* Conversational System Analysis

---

## Dell FutureMinds AI Hackathon 2026

This project was developed as part of the Dell FutureMinds AI Hackathon 2026 and demonstrates how Digital Twin technology, predictive analytics, simulation, and AI reasoning can be combined to create an intelligent laptop monitoring platform.
