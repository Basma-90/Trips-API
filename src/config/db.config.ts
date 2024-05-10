import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import TripModel from '../models/trip.model';

dotenv.config();

const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions); 
        console.log('Connected to the database');
    } catch (error) {
        console.log('Failed to connect to the database');
    }
};


async function deleteAllTrips() {
    try {
        await TripModel.deleteMany({});
        console.log('All trips deleted successfully');
    } catch (error) {
        console.error('Error deleting all trips:', error);
    } finally {
        mongoose.disconnect();
    }
}

//deleteAllTrips();

export { dbConnect };
