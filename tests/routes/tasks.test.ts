import { describe, it, expect, vi } from 'vitest';
import request from 'supertest'; // simulates client requests
import express from 'express';
import taskRoutes from '../../src/routes/tasks.js';
import {
  TaskRow,
  TaskInsert,
} from '../../src/types/database.types.js';

// Isolation for tests, don't use actual server, focused testing
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
  // Mock the Supabase client
  vi.mock('../../src/config/supabase.js', () => {
    return {
      default: {
        from: (table: string) => {
          // Return different mock implementations based on the table name
          if (table === 'Tasks') {
            return {
              // Mock for GET all tasks
              select: () => ({
                data: [] as TaskRow[], // Empty array for GET all
                error: null, // No errors = success
              }),

              // Mock for POST to create task (Supabase.insert())
              insert: (data: TaskInsert) => ({
                select: () => ({
                  single: () => {
                    // Return a fake task with the submitted data plus an ID
                    const mockTask: TaskRow = {
                      id: 'mock-id-123',
                      title: data.title,
                      status: data.status,
                      description: data.description || null,
                      user_id: data.user_id || 'default-user-id',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    };
                    return {
                      data: mockTask,
                      error: null,
                    };
                  },
                }),
              }),

              delete: () => ({
                eq: (field: string, value: string) => ({
                  single: () => {
                    const deletedTask: TaskRow = {
                      id: value,
                      title: 'Deleted Task',
                      status: 'Deleted',
                      description: null,
                      user_id: 'test-user-id',
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    };

                    return {
                      data: deletedTask,
                      error: null,
                    };
                  },
                }),
              }),

              //Only testing the route
              update: () => ({
                eq: (field: string, value: string) => ({
                  select: () => ({
                    single: () => {
                      const updatedTask: TaskRow = {
                        id: value,
                        title: 'Updated Task',
                        status: 'Completed',
                        description: null,
                        user_id: 'test-user-id',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                      };

                      return {
                        data: updatedTask,
                        error: null
                      }
                    }
                  })
                })
              })
            };
          }
          return {};
        },
      },
    };
  });

  it('should get all tasks', async () => {
    // Supertest simulates HTTP requests
    const response = await request(app).get('/api/tasks').expect(200); // Status code assertion

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        status: 'To Do',
        description: 'Test description', // Add if needed
        due_date: new Date().toISOString(), // Add if needed
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', 'Test Task');
    expect(response.body).toHaveProperty('status', 'To Do');
  });

  it('should update an existing task', async () => {
    const taskId = 'mock-id-123';
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({
        status: 'Completed'
      })
      .expect(200);

    expect(response.body).toHaveProperty('status', 'Completed');
  });
});
