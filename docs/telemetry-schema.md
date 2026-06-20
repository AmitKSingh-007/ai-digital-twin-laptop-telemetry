# AI Digital Twin for Laptop Telemetry

## Telemetry Schema Documentation

### Overview

This document defines the telemetry schema used by the AI Digital Twin platform. The telemetry dataset represents the operational state of a laptop over time and serves as the foundation for:

* Digital Twin State Construction
* Predictive Analytics
* Anomaly Detection
* What-If Simulations
* Explainable AI Diagnostics

Each telemetry record corresponds to a snapshot of the system at a specific timestamp.

---

# Sample Telemetry Record

```json
{
  "timestamp": "2026-06-18T10:15:00Z",
  "cpu_utilization_pct": 42,
  "cpu_temperature_c": 58,
  "gpu_temperature_c": 55,
  "memory_utilization_pct": 63,
  "fan_speed_rpm": 1600,
  "battery_drain_w": 6.8,
  "battery_health_pct": 96.5,
  "disk_health_pct": 98.9,
  "wifi_signal_dbm": -45,
  "power_mode": "Balanced"
}
```

---

# Field Definitions

## 1. timestamp

### Description

Timestamp indicating when the telemetry snapshot was captured.

### Data Type

String (ISO 8601)

### Example

```json
"2026-06-18T10:15:00Z"
```

### Usage

* Time-series analysis
* Trend detection
* Forecasting
* Visualization

---

## 2. cpu_utilization_pct

### Description

Percentage of CPU resources currently in use.

### Data Type

Number

### Unit

Percent (%)

### Range

0 - 100

### Example

```json
42
```

### Dependencies

Affected by:

* User workload
* Application execution
* Background processes

### Used In

* Power estimation
* Thermal modeling
* Performance analysis
* Thermal throttling simulation

---

## 3. cpu_temperature_c

### Description

Current CPU temperature.

### Data Type

Number

### Unit

Degrees Celsius (°C)

### Typical Range

35°C - 95°C

### Example

```json
58
```

### Dependencies

Affected by:

* CPU utilization
* Power consumption
* Fan speed
* Ambient temperature

### Mathematical Model

Newton's Law of Cooling

```text
T_new = T_current + (T_equilibrium - T_current) × Thermal_Inertia
```

### Used In

* Thermal forecasting
* Fan control
* Thermal throttling
* Anomaly detection

---

## 4. gpu_temperature_c

### Description

Current GPU temperature.

### Data Type

Number

### Unit

Degrees Celsius (°C)

### Typical Range

35°C - 90°C

### Example

```json
55
```

### Dependencies

Affected by:

* Graphics workloads
* GPU utilization
* Ambient temperature

### Used In

* Thermal health monitoring
* Future GPU simulations

---

## 5. memory_utilization_pct

### Description

Percentage of RAM currently in use.

### Data Type

Number

### Unit

Percent (%)

### Range

0 - 100

### Example

```json
63
```

### Dependencies

Affected by:

* Running applications
* Browser tabs
* Background services

### Used In

* Workload classification
* Performance analysis

---

## 6. fan_speed_rpm

### Description

Current cooling fan rotational speed.

### Data Type

Number

### Unit

RPM (Revolutions Per Minute)

### Typical Values

```text
1600 RPM (Low)
4600 RPM (High)
```

### Example

```json
1600
```

### Dependencies

Affected by:

* CPU temperature
* Fan hysteresis logic

### Hysteresis Logic

Fan enters high-speed mode:

```text
Temperature > 76°C
```

Fan exits high-speed mode:

```text
Temperature < 64°C
```

### Used In

* Thermal regulation
* Fan failure simulation
* Cooling efficiency analysis

---

## 7. battery_drain_w

### Description

Current battery power consumption.

### Data Type

Number

### Unit

Watts (W)

### Example

```json
6.8
```

### Dependencies

Affected by:

* CPU utilization
* DVFS behavior
* System workload

### Mathematical Model

Dynamic Voltage and Frequency Scaling (DVFS)

```text
Power = 4.5 + (Load / 18)^2.3
```

### Used In

* Battery analytics
* Power forecasting
* Energy efficiency analysis

---

## 8. battery_health_pct

### Description

Estimated remaining battery health.

### Data Type

Number

### Unit

Percent (%)

### Example

```json
96.5
```

### Dependencies

Affected by:

* Thermal stress
* Charging cycles
* Workload intensity

### Degradation Rule

When:

```text
Temperature > 80°C
```

Battery health gradually decreases.

### Used In

* Predictive maintenance
* Remaining lifespan estimation

---

## 9. disk_health_pct

### Description

Estimated SSD health.

### Data Type

Number

### Unit

Percent (%)

### Example

```json
98.9
```

### Dependencies

Affected by:

* Thermal exposure
* System wear
* Long-term operation

### Used In

* Storage health forecasting
* Predictive maintenance

---

## 10. wifi_signal_dbm

### Description

Wireless signal strength.

### Data Type

Number

### Unit

dBm

### Example

```json
-45
```

### Typical Range

```text
-30 dBm = Excellent
-50 dBm = Strong
-70 dBm = Fair
-90 dBm = Weak
```

### Used In

* Connectivity diagnostics
* Network quality monitoring

---

## 11. power_mode

### Description

Current system power profile.

### Data Type

String

### Possible Values

```text
Power Saver
Balanced
Performance
```

### Example

```json
"Balanced"
```

### Used In

* Workload simulation
* Battery forecasting
* Power analysis

---

# Telemetry Relationships

## CPU Load → Power Consumption

Higher CPU utilization increases power draw.

```text
CPU Load ↑
      ↓
Battery Drain ↑
```

---

## Power Consumption → Temperature

Increased power consumption generates heat.

```text
Battery Drain ↑
      ↓
CPU Temperature ↑
```

---

## Temperature → Fan Speed

High temperatures trigger cooling mechanisms.

```text
CPU Temperature ↑
      ↓
Fan Speed ↑
```

---

## Temperature → Component Health

Sustained thermal stress accelerates wear.

```text
CPU Temperature ↑
      ↓
Battery Health ↓
Disk Health ↓
```

---

## Temperature → Thermal Throttling

Critical temperatures reduce performance.

```text
Temperature > 92°C
      ↓
CPU Throttling
      ↓
Performance Reduction
```

---

# Future Digital Twin Features

The telemetry schema supports future extensions:

* GPU utilization
* Battery charge cycles
* Process-level monitoring
* Real-time streaming telemetry
* Failure prediction
* Advanced simulation scenarios

---

# Conclusion

This telemetry schema provides the foundation for building a realistic AI-powered Digital Twin capable of:

* Monitoring laptop health
* Predicting future behavior
* Detecting anomalies
* Running simulations
* Providing explainable diagnostics using AI
