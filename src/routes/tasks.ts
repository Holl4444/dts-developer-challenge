import express, { Request, Response } from 'express';
import supabase from '../config/supabase.js';
import { TaskInsert } from '../types/database.types.js';

// Now holds '/api/tasks/' path
const router = express.Router();

// RES ALWAYS RETURNS. TS IS NOT A FAN OF RETURNING RESPONSE OBJECTS!

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('Tasks').select('*');
    
    if (error) {
      res.status(500).json({ error: error.message });
      return; 
    }
    // Supabase has already processed to json
    res.json(data || []);

  } catch (err) {
    console.error(`Error fetching tasks: `, err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET single task (.single returns object not array of 1 object and null if not found)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('Tasks')
      .select()
      .eq('id', `${req.params.id}`).single(); // WHERE id = id
    
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (!data) {
      res.status(404).json({ error: 'Task not found' });
      return; 
    }
    res.json(data);

  } catch (err) {
    console.error(
      `Error fetching task: with id ${req.params.id}`,
      err
    );
    res.status(500).json({ error: 'Failed to fetch task' });
    return; 
  }
});

// POST create task

router.post('/', async (req: Request<{}, {}, TaskInsert>, res: Response) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ error: 'Title is required' });
      return; 
    }
    const { data, error } = await supabase.from('Tasks').insert(req.body).select().single();
    
    if (error) {
      res.status(500).json({ error: error.message });
      return; 
    }
    res.status(201).json(data);
  } catch (err) {
    console.error(`Error adding task`, err);
    res.status(500).json({ error: `Failed to add task` });
    return; 

  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', `${req.params.id}`).single();
    
      if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.json({
      message: `Task deleted successfully`,
      deletedTask: data
    })

  } catch (err) {
    console.error(`Error deleting task with id ${req.params.id}`, err);
    res
      .status(500)
      .json({
        error: `Failed to delete task with id ${req.params.id}`,
      });
    return;
  }
})

// PUT, PATCH

export default router;
