import { Distance } from "../domain/distance";
import { Energy } from "../domain/energy";
import { Time } from "../domain/time";

export interface IPathDTO {
  id: string;
  idWarehouseStart: string;
  idWarehouseEnd: string;
  //idTrip: idTrip;
  distance: Distance;
  time: Time;
  energy: Energy;
  extraTime: Time;
  }