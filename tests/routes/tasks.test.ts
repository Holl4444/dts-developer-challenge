import { describe, it, expect } from 'vitest';
import request from 'supertest'; // simulates client requests
import express from 'express';
import taskRoutes from '../../src/routes/tasks.js';

// Isolation for tests, don't use actual server, focused testing
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
    it('should get all tasks', async () => {
    // Supertest simulates HTTP requests
    const response = await request(app).get('/api/tasks').expect(200); // Status code assertion

    expect(response.body).toHaveProperty('message');
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', status: 'To Do' })
      .expect(201);

    expect(response.body).toHaveProperty('message', 'Create task');
  });
});