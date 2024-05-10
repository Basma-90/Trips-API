import express, { Application } from 'express';
import { dbConnect } from './config/db.config';
import tripRouter from './routes/trip.route';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';


const PORT: number= 3000;
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use('/trips', tripRouter);


app.listen(PORT, async () => {
        await dbConnect();
        console.log(`Server is running at http://localhost:${PORT}`);
});     




