import { Request, Response } from 'express';
import TripModel from '../models/trip.model';

export const scheduleTrip = async (req: Request, res: Response) => {
    try{
        const { departure, destination, price, startDate, duration, passengers } = req.body;
        if(! departure || ! destination || ! price || ! startDate || ! duration || ! passengers){
            return res.status(400).json({ message: "Missing required fields" });
        }

        if(passengers < 2){
            return res.status(400).json({ message: "Number of passengers must be at least 2" });
        }

        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if(! dateRegex.test(startDate)){
            return res.status(400).json({ message: "Invalid date format. Please use DD-MM-YYYY" });
        }

        const newTrip = new TripModel({
            departure,
            destination,
            price,
            startDate,
            duration,
            passengers
        });

        await newTrip.save();
        res.status(201).json({ message: "Trip scheduled successfully", trip: newTrip });
    }
    catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}
