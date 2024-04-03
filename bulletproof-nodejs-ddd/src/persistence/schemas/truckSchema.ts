import mongoose from 'mongoose';
import { ITruckPersistence } from '../../dataschema/ITruckPersistence';

const Truck = new mongoose.Schema(
  {
    id: { 
      type: String,
      unique: true
    },

    plate:{
      type: String,
      unique: true
    },

    tare: {
      type: Number,
      index: true
    },

    massCapacity: {
      type: Number,
      index: true
    },

    maximumBattery: {
      type: Number,
      index: true
    },

    autonomy: {
      type: Number,
      index: true
    },

    chargeTime: {
      hours : Number,
      minutes : Number,
      seconds : Number
    },

    active: {
      type: Boolean,
      index: true
    }

  },
  { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', Truck);
