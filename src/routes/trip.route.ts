import express, { Router } from 'express';
import { scheduleTrip } from '../controllers/trip.controller';
import { getAllTrips } from '../controllers/getAllTrips';

const router : Router = express.Router();

router.get('/', getAllTrips);
router.post('/', scheduleTrip);


export default router;