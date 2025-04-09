import express, { Request, Response } from 'express';

// Now holds '/api/tasks/' path
const router = express.Router();

// GET all tasks
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all tasks' });
});

// GET single task
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get task ${req.params.id}` });
});

// POST create task
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create task', body: req.body });
});

// Other task routes...

export default router;
