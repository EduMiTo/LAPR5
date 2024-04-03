import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { TruckId } from "../../domain/truckId";

export default interface IUserRepo extends Repo<Truck> {
	save(truck: Truck): Promise<Truck>;
    findByDomainId (truckId: TruckId | string): Promise<Truck>;
    findByPlate(plate: string): Promise<Truck>;
    findAll(): Promise<Array<Truck>>;
    delete(truck: Truck): Promise<Truck>;
    inhibit(truck: Truck): Promise<Truck>;
    activate(truck: Truck): Promise<Truck>;
}
  