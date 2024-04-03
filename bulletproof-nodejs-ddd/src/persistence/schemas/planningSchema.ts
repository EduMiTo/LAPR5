import mongoose from 'mongoose';
import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';

const Planning = new mongoose.Schema(
  {
    id:{
      type: String,
      unique: true
    },
    truckPlate:{
      type: String,
      index: true
    },

    planningDate:{
      type: String,
      index: true
    },

    path: {
      type : String,
      index: true
    },
  
    planningTime: {
      type : Number,
      index: true
    },

    heuristic:{
      type: String,
      index: true
    }

  },
  { timestamps: true },
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', Planning);
