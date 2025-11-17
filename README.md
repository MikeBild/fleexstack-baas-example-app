# FleexStack Sample Application

A simple Node.js/Express application for testing FleexStack deployment pipeline.

## Features

- Health check endpoint at `/health`
- API information at `/api/info`
- Deployment info at `/api/deployment`
- Graceful shutdown handling
- Docker support with health checks
- Production-ready configuration

## Local Development

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm start
```

The app will be available at `http://localhost:3000`

### Test endpoints
```bash
# Health check
curl http://localhost:3000/health

# Main page
curl http://localhost:3000/

# API info
curl http://localhost:3000/api/info

# Deployment info
curl http://localhost:3000/api/deployment
```

## Docker

### Build image
```bash
docker build -t sample-app .
```

### Run container
```bash
docker run -p 3000:3000 sample-app
```

### Test health check
```bash
docker inspect --format='{{json .State.Health}}' <container_id>
```

## Deployment to FleexStack

1. Create GitHub repository for this app
2. Install FleexStack GitHub App on the repository
3. Push code to GitHub
4. FleexStack will automatically:
   - Build Docker image
   - Push to registry
   - Deploy to Green environment
   - Run health checks
   - Switch traffic on success

## Configuration

See `fleexstack.yml` for deployment configuration:
- Port: 3000
- Health check: `/health` every 10s
- Resources: 512MB RAM, 0.5 CPU
- Strategy: Blue/Green deployment

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)
- `VERSION` - App version (default: 1.0.0)

## Endpoints

- `GET /` - Welcome message and features
- `GET /health` - Health check (required by FleexStack)
- `GET /api/info` - Application and system information
- `GET /api/deployment` - Deployment information
# Deployment test
# Test deployment - So. 16 Nov. 2025 23:10:12 CET
# Deployment test - So. 16 Nov. 2025 23:14:38 CET
# Enhanced logging test - So. 16 Nov. 2025 23:16:29 CET
# Final deployment test - So. 16 Nov. 2025 23:18:38 CET
# FINAL TEST - So. 16 Nov. 2025 23:19:40 CET
# Deployment test with enhanced error logging - So. 16 Nov. 2025 23:23:44 CET
# Testing GitHub API fixes - So. 16 Nov. 2025 23:26:04 CET
# Complete end-to-end deployment test - So. 16 Nov. 2025 23:28:44 CET
