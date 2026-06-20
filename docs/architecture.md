# AI Digital Twin for Laptop Telemetry

# System Architecture Documentation

## Overview

The AI Digital Twin for Laptop Telemetry is designed to create a virtual representation of a physical laptop using telemetry data, predictive analytics, simulation models, anomaly detection, and Explainable AI.

Unlike traditional monitoring dashboards that only display current metrics, the Digital Twin continuously maintains an internal state model, predicts future behavior, detects abnormal conditions, and allows users to run "What-If" simulations.

---

# High-Level Architecture

```text
┌─────────────────────────┐
│ Telemetry Generator     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Telemetry Data Store    │
│ telemetry.json          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Twin Engine             │
│ Current State Builder   │
└────────────┬────────────┘
             │
 ┌───────────┼───────────┐
 ▼           ▼           ▼
Prediction  Anomaly    Simulation
 Engine     Detector    Engine
 └──────┬─────┴─────┬─────┘
        ▼           ▼
     Gemini AI Layer
             │
             ▼
┌─────────────────────────┐
│ React Dashboard         │
└─────────────────────────┘
```

---

# System Components

## 1. Telemetry Generator

### Purpose

Simulates realistic laptop behavior and generates time-series telemetry data.

### Responsibilities

* Generate CPU utilization
* Generate CPU temperature
* Generate fan speed
* Generate battery drain
* Generate battery health
* Generate SSD health
* Generate memory usage
* Generate GPU temperature

### Output

```text
telemetry.json
```

### Technology

```text
Node.js
```

---

# 2. Telemetry Data Store

## Purpose

Stores historical telemetry records.

## Current Implementation

```text
JSON File Storage
```

File:

```text
backend/data/telemetry.json
```

## Reason for JSON

* Easy integration with JavaScript
* No database setup required
* Faster development for hackathon
* Portable and human-readable

## Future Upgrade

Production deployment could use:

```text
TimescaleDB
InfluxDB
MongoDB Time-Series
```

---

# 3. Twin Engine

## Purpose

Creates and maintains the Digital Twin state.

The Twin Engine transforms raw telemetry into meaningful system state information.

---

## Inputs

```text
telemetry.json
```

---

## Outputs

```javascript
{
  currentState,
  averages,
  trends,
  healthMetrics
}
```

---

## Responsibilities

### Current State Extraction

Example:

```javascript
{
  currentTemp: 68,
  currentLoad: 54,
  batteryHealth: 96.5,
  diskHealth: 98.9
}
```

---

### Rolling Window Analysis

Calculate:

```text
Average CPU Load
Average Temperature
Average Power Consumption
```

using recent telemetry.

---

### Trend Analysis

Determine whether:

```text
Temperature is Rising
Temperature is Stable
Temperature is Falling
```

---

# 4. Prediction Engine

## Purpose

Forecast future system behavior.

---

## Module Structure

```text
predictors/
├── tempPredictor.js
├── batteryPredictor.js
└── diskPredictor.js
```

---

# Temperature Predictor

Predict:

```text
5 minutes ahead
15 minutes ahead
```

Example:

```javascript
{
  predictedTemp5Min: 74,
  predictedTemp15Min: 79
}
```

---

# Battery Predictor

Forecast:

```text
30 Days
60 Days
90 Days
```

Example:

```javascript
{
  health30d: 95.4,
  health60d: 94.7,
  health90d: 94.0
}
```

---

# SSD Predictor

Forecast future SSD wear.

Example:

```javascript
{
  diskHealth30d: 98.2,
  diskHealth90d: 97.3
}
```

---

# 5. Anomaly Detection Engine

## Purpose

Detect abnormal hardware behavior.

---

## Responsibilities

Identify:

### Thermal Anomalies

Example:

```text
Temperature > 90°C
CPU Load < 30%
```

Potential issue:

```text
Cooling Inefficiency
```

---

### Fan Anomalies

Example:

```text
Temperature Increasing
Fan Speed Unchanged
```

Potential issue:

```text
Cooling Fan Failure
```

---

### Power Anomalies

Example:

```text
Power Consumption High
CPU Utilization Low
```

Potential issue:

```text
Background Process
Battery Issue
```

---

## Output

```javascript
[
  {
    type: "THERMAL_ANOMALY",
    severity: "HIGH",
    description: "Possible cooling inefficiency."
  }
]
```

---

# 6. Simulation Engine

## Purpose

Allow users to test hypothetical scenarios.

---

## Module Structure

```text
simulators/
├── fanFailure.js
├── desertHeat.js
└── heavyCompile.js
```

---

# Simulation 1

Cooling Fan Failure

### Input

```text
Fan Speed = 0
```

### Output

Predict:

```text
Temperature Rise
Performance Loss
Thermal Throttling
```

---

# Simulation 2

Desert Heat Scenario

### Input

```text
Ambient Temperature = 48°C
```

### Output

Predict:

```text
Cooling Performance
Temperature Stability
```

---

# Simulation 3

Heavy Compilation

### Input

```text
CPU Load = 95%
```

### Output

Predict:

```text
Power Consumption
Temperature Increase
Fan Response
```

---

# 7. Explainable AI Layer

## Purpose

Convert engineering data into understandable insights.

---

## Technology

```text
Gemini API
```

---

## Inputs

```javascript
{
  currentState,
  predictions,
  anomalies,
  simulationResults
}
```

---

## Outputs

Human-readable diagnostics.

Example:

```text
Observation:
CPU temperature increased from 65°C to 81°C.

Correlation:
High CPU utilization caused increased power draw.

Prediction:
System may reach 90°C in 10 minutes.

Recommendation:
Reduce workload or improve cooling.
```

---

# Explainability Requirement

Every response follows:

```text
Observation

Correlation

Prediction

Recommendation
```

This satisfies Explainable AI requirements.

---

# 8. React Dashboard

## Purpose

Provide visual interaction with the Digital Twin.

---

# Dashboard Components

```text
DashboardCharts.jsx
TwinStatus.jsx
PredictionPanel.jsx
AnomalyPanel.jsx
SimulationPanel.jsx
ChatConsole.jsx
```

---

# Live Telemetry Section

Displays:

```text
CPU Load
CPU Temperature
Fan Speed
Battery Drain
```

using charts.

---

# Twin State Section

Displays:

```text
Current State
Trend Indicators
Health Metrics
```

---

# Prediction Section

Displays:

```text
Future Temperature
Battery Forecast
SSD Forecast
```

---

# Anomaly Section

Displays:

```text
Risk Alerts
Severity Levels
```

---

# Simulation Section

Allows users to run:

```text
Fan Failure
Desert Heat
Heavy Compilation
```

scenarios.

---

# AI Console

Allows users to ask:

```text
Why is temperature rising?

Will my battery degrade?

What happens if the fan fails?
```

---

# Data Flow

```text
Telemetry Generator
       │
       ▼
Telemetry Storage
       │
       ▼
Twin Engine
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
Prediction
Anomaly
Simulation
       │
       ▼
Gemini AI
       │
       ▼
React Dashboard
```

---

# Design Principles

## Modularity

Every component is isolated and independently testable.

---

## Explainability

AI decisions must always include reasoning.

---

## Scalability

JSON-based architecture can later migrate to a time-series database.

---

## Realism

Telemetry follows:

* DVFS
* Newton's Law of Cooling
* Fan Hysteresis
* Thermal Throttling

instead of random values.

---

# Expected Outcomes

The Digital Twin will be capable of:

* Monitoring laptop health
* Forecasting future conditions
* Detecting anomalies
* Running simulations
* Explaining hardware behavior using AI

This transforms raw telemetry into actionable engineering intelligence and demonstrates the practical use of Digital Twins combined with Explainable AI.
