import { Distance } from "../domain/distance";
import { Energy } from "../domain/energy";
import { Time } from "../domain/time";

export interface IPathPersistence {
    id: string;
    //pathId: string;
    idWarehouseStart: string;
    idWarehouseEnd: string;
    //idTrip: idTrip;
    distance: Distance;
    time: Time;
    energy: Energy;
    extraTime: Time;
  }