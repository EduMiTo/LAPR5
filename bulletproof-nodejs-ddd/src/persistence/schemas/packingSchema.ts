import mongoose from 'mongoose';
import { IPackingPersistence } from '../../dataschema/IPackingPersistence';

const Packing = new mongoose.Schema(
  {
    id: { 
      type: String,
      unique: true
    },

    truckPlate:{
      type: String,
      index: true
    },

    deliveryId:{
        type: String,
        index: true
    },
  
    position: {
      positionX : Number,
      positionY : Number,
      positionZ : Number
    },

  },
  { timestamps: true },
);

export default mongoose.model<IPackingPersistence & mongoose.Document>('Packing', Packing);
