import mongoose from "mongoose";

const tripSchema  = new mongoose.Schema({
    departure:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    passengers:{
        type: Number,
        required: true,
        min:2
    }
    });

const Tour = mongoose.model("Trip", tripSchema);
export default Tour;

