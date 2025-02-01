# Graphing Tools for Naemon

## Overview

Naemon itself does not provide built-in graphing functionality, but it can
integrate with several external tools to visualize performance data. This page
covers two popular graphing solutions: Grafana and PNP4Nagios.

## Grafana

[Grafana](https://grafana.org/) is a powerful, open-source visualization tool
that can be used to display Naemon performance data. Grafana does not natively
support Naemon, but it can be integrated through time-series databases like InfluxDB
or Victoriametrics.

### Integration Overview

1. **Export Performance Data**: Use plugins like [nagflux](https://github.com/ConSol-Monitoring/nagflux)
   to send performance data from Naemon to InfluxDB.
2. **Store Data**: Configure InfluxDB to receive and store performance metrics.
3. **Visualize with Grafana**:
   - Add InfluxDB as a data source in Grafana.
   - Create dashboards and panels using Naemon's performance data.
   - Use plugins like [histou](https://github.com/ConSol-Monitoring/histou) to dynamically generate graphs.

### Advantages

- Grafana offers a wide range of visualization options.
- You can easily create dashboards without writing any code.

### Disadvantages

- InfluxDB or Victoriametrics add complexity to the setup.

## PNP4Nagios

[PNP4Nagios](https://www.pnp4nagios.org/) is a classic graphing tool designed specifically
for Naemon-compatible monitoring systems. It processes Naemon’s performance data
and generates RRD-based graphs.

### Advantages

- Simple setup for existing Naemon installations.
- Uses RRDTool for efficient storage.
- Minimal maintenance overhead
- Very fast graph generation

### Disadvantages

- RRDGraphs are not as shiny as modern graphing tools.
- Creating custom graph templates requires PHP knowledge.

For further details, refer to the official documentation of each tool.
