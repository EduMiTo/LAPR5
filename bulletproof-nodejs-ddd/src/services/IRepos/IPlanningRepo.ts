import { Repo } from "../../core/infra/Repo";
import { Planning } from "../../domain/planning";
import { TruckPlate } from "../../domain/truckPlate";

export default interface IPlanningRepo extends Repo<Planning> {
	save(packing: Planning): Promise<Planning>;
    findByPlateAndDate (pplate:  TruckPlate | string, ddate: string): Promise<Planning>;
    findAll(): Promise<Array<Planning>>;
    findByID(id: string): Promise<Planning>;
    delete(packing: Planning): Promise<Planning>;
}