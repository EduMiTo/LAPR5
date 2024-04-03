import mongoose from 'mongoose';
import { ITripPersistance } from '../../../src/dataschema/ITripPersistance';

const Trip = new mongoose.Schema(
  {
    id: { 
      type: String,
      unique: true
    },

    designation:{
      type: String,
      unique: true
    },

    date:{
      type: Date,
      index: true
    }

  },
  { timestamps: true },
);

export default mongoose.model<ITripPersistance & mongoose.Document>('Trip', Trip);
