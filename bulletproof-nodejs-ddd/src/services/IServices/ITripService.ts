import { Result } from "../../core/logic/Result";
import { ITripDTO } from "../../dto/ITripDTO";

export default interface ITripService  {
  createTrip(tripDTO: ITripDTO): Promise<Result<ITripDTO>>;
  getTripByDate(date: Date): Promise<Result<Array<ITripDTO>>>;
  getTrips(): Promise<Result<Array<ITripDTO>>>;
}
