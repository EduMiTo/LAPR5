import { Result } from "../../core/logic/Result";
import { ITruckDTO } from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  deleteTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTruckByPlate(plate: string): Promise<Result<ITruckDTO>>;
  getTrucks(): Promise<Result<Array<ITruckDTO>>>;
  inhibitTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  activateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
}
