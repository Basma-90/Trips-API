import { Request, Response } from 'express';
import TripModel from '../models/trip.model';

export const getAllTrips = async (req: Request, res: Response) => {
    try {
        if(req.query && Object.keys(req.query).length > 0){
            const page  = parseInt(req.query.page as string) || 1;
            const limit  = parseInt(req.query.limit as string) || 10;
            const skip  = (page - 1) * limit;

            let filters: any = {};

            const trimmedParams: any = {};
            Object.keys(req.query).forEach(key => {
                const value = req.query[key];
                if (typeof value === 'string') {
                    trimmedParams[key] = value.trim();
                } else {
                    trimmedParams[key] = value;
                }
            });

            Object.keys(trimmedParams).forEach(key => {
                if (key === 'page' || key === 'limit' || key === 'sort') {
                    return; 
                }
                if (key === 'date_from' || key === 'date_till') {
                    filters.startDate = { ...filters.startDate, [key === 'date_from' ? '$gte' : '$lte']: trimmedParams[key] };
                } else {
                    filters[key] = trimmedParams[key];
                }
            });

            const sort: any = {};

            if (trimmedParams.sort) {
                const sortFields = (trimmedParams.sort as string).split(',');
                sortFields.forEach((field: string) => {
                    sort[field.startsWith('-') ? field.slice(1) : field] = field.startsWith('-') ? -1 : 1;
                });
            }

            const trips = await TripModel.find(filters)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            res.status(200).json({ trips });
        } else {
            const trips = await TripModel.find();
            res.status(200).json({ trips });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};