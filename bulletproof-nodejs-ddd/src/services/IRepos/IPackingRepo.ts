import { Repo } from "../../core/infra/Repo";
import { Packing } from "../../domain/packing";
import { PackingId } from "../../domain/packingId";
import { TruckPlate } from "../../domain/truckPlate";

export default interface IPackingRepo extends Repo<Packing> {
	save(packing: Packing): Promise<Packing>;
    findByDomainId (id: PackingId | string): Promise<Packing>;
    findAll(): Promise<Array<Packing>>;
    findByDeliveryId(deliveryId: string): Promise<Array<Packing>>;
    findByTruckPlate(truckPlate: string): Promise<Array<Packing>>;
    findDeliveriesByPlateAndDate(plate: string, date: string): Promise<Array<String>>;
    delete(packing: Packing): Promise<Packing>;

}
  