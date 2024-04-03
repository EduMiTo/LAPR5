
import { Position } from "../domain/position";
import { TruckId } from "../domain/truckId";
import { TruckPlate } from "../domain/truckPlate";

export interface IPackingPersistence {
    id: string;
    position: Position;
    truckPlate: TruckPlate;
    deliveryId: string;
  }