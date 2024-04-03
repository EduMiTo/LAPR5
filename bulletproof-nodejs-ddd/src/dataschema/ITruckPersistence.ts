import { Distance } from "../domain/distance";
import { Energy } from "../domain/energy";
import { Time } from "../domain/time";
import { TruckPlate } from "../domain/truckPlate";
import { Weight } from "../domain/weight";

export interface ITruckPersistence {
    id: string;
    plate: TruckPlate;
    tare: Weight;
    massCapacity: Weight;
    maximumBattery: Energy;
    autonomy: Distance;
    chargeTime: Time;
    active: boolean;
  }