import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from '../src/routes/tasks.js';

// Create a test app that mimics the main app setup
const createTestApp = () => {
  dotenv.config();
  const app = express();
  app.use(express.json());

  // Home route
  app.get('/', (req, res) => {
    res.send('Task Management API');
  });

  // Mount task routes
  app.use('/api/tasks', taskRoutes);

  return app;
};

describe('Main Application', () => {
  const app = createTestApp();

  it('should respond to the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Task Management API');
  });

  it('should have task routes accessible', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
  });
});
