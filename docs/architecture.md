# Atlas Command Center Architecture

## Overview

Atlas Command Center is a personal operations platform combining a command dashboard with automated trading signal processing.

## Components

### Dashboard (Next.js 15)

- **Purpose**: Personal command center UI
- **Routes**:
  - `/dashboard` - Overview
  - `/dashboard/construction` - Window replacement business tracking
  - `/dashboard/trading` - Trading signals & performance
  - `/dashboard/tech` - Development projects
  - `/dashboard/life` - Personal tasks & goals

### Signals API (FastAPI)

- **Purpose**: Trading signal ingestion and processing
- **Endpoints**:
  - `GET /health` - Service health check
  - Future: Signal ingestion, backtesting, alerts

### Infrastructure

- **PostgreSQL**: Primary database for applications
- **Redis**: Caching and message queue

## Data Flow

1. Trading signals ingested via API
2. Processed and stored in PostgreSQL
3. Dashboard queries API for visualization
4. Real-time updates via WebSocket (future)
