const express = require('express');
const app = express();
const packageInfo = require('./package.json');

// Configuration
const PORT = process.env.PORT || 3000;
const VERSION = packageInfo.version || process.env.VERSION || '1.0.0';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint (required by FleexStack)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: VERSION,
    environment: ENVIRONMENT,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from FleexStack!',
    version: VERSION,
    environment: ENVIRONMENT,
    deployedAt: new Date().toISOString(),
    features: [
      'Zero-downtime deployments',
      'Blue/Green switching',
      'Automatic health checks',
      'Container orchestration',
    ],
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'fleexstack-sample-app',
    version: VERSION,
    environment: ENVIRONMENT,
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
  });
});

// Test endpoint for deployment verification
app.get('/api/deployment', (req, res) => {
  res.json({
    deployment: {
      timestamp: new Date().toISOString(),
      version: VERSION,
      environment: ENVIRONMENT,
      hostname: require('os').hostname(),
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('FleexStack Sample Application');
  console.log('='.repeat(50));
  console.log(`Version: ${VERSION}`);
  console.log(`Environment: ${ENVIRONMENT}`);
  console.log(`Port: ${PORT}`);
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('='.repeat(50));
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`API Info: http://localhost:${PORT}/api/info`);
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
