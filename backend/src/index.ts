import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Allow back and frontend communication
//Js as thats how it will appear after tscompiler
import taskRoutes from './routes/tasks.js';

// Access env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Restricted CORS configuration so that only frontend requests are permitted
const corsOptions = {
  origin: [
    'http://localhost:3000', 'postman'], // Only allow requests from Next.js frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

// Access req.body as json
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Task Management API");
    console.log(`Response sent`);
})

// Attach tasks router at this task prefix
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})