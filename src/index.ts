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

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'none'; connect-src http://localhost:3000;");
    next();
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack); // Log error stack trace to console
        res.status(500).send({ message: err.message });
         // Send error message to client
         next();
    });

app.listen(PORT, async () => {
        await dbConnect();
        console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
});     




