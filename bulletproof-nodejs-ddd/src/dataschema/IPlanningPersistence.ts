import { TruckPlate } from "../domain/truckPlate";

export interface IPlanningPersistence {
    id: string;
    truckPlate: TruckPlate;
    planningDate: string;
    path: string;
    planningTime: number;
    heuristic: string;
  }