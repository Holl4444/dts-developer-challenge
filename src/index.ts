import express from 'express';
import dotenv from 'dotenv';

// Access env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Access req.body as json
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Juhu verld");
    console.log(`Response sent`);
})

app.get('/api', (req, res) => {
    
})
app.get('/api/:id', (req, res) => {

})

app.post('/api/:id', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})