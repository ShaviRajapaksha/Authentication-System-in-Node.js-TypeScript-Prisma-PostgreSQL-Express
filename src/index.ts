import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import type { Request, Response } from 'express';



const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});


app.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Welcome to the Authentication API' });
});


