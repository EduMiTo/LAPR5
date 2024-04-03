import { Result } from "../../core/logic/Result";
import { TruckPlate } from "../../domain/truckPlate";
import { IPackingDTO } from "../../dto/IPackingDTO";

export default interface IPackingService  {
  createPacking(packingDTO: IPackingDTO): Promise<Result<IPackingDTO>>;
  getPackings(): Promise<Result<Array<IPackingDTO>>>;
  getPackingsByDeliveryId(deliveryId: string): Promise<Result<Array<IPackingDTO>>>;
  getPackingsByTruckPlate(truckPlate: string): Promise<Result<Array<IPackingDTO>>>;
  updatePacking(packingDTO: IPackingDTO): Promise<Result<IPackingDTO>>;
  getPackingById(id: string): Promise<Result<IPackingDTO>>;
  getDeliveriesByTruckAndDate(Data): Promise<Result<Array<String>>>;
  deletePacking(packingDTO: IPackingDTO): Promise<Result<IPackingDTO>>;
}
