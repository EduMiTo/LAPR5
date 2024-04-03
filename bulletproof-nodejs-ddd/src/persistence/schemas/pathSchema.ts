import mongoose from 'mongoose';
import { IPathPersistence } from '../../dataschema/IPathPersistence';

const Path = new mongoose.Schema(
  {
    id: { 
      type: String,
      unique: true
    },

    idWarehouseStart:{
      type: String,
      index: true
    },

    idWarehouseEnd: {
      type: String,
      index: true
    },

    /*idTrip: {
      type: String,
      index: true
    },*/

    distance: {
      type: Number,
      index: true
    },

    time: {
      hours : Number,
      minutes : Number,
      seconds : Number
    },

    energy: {
      type: Number,
      index: true
    },

    extraTime: {
      hours : Number,
      minutes : Number,
      seconds : Number
    },


  },
  { timestamps: true },
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', Path);
