import { Repo } from "../../core/infra/Repo";
import { Trip } from "../../domain/trip";
import { TripId } from "../../domain/tripId";

export default interface ITripRepo extends Repo<Trip> {
	save(trip: Trip): Promise<Trip>;
    findByDomainId (tripId: TripId | string): Promise<Trip>;
    findByDate(date: Date): Promise<Array<Trip>>;
    findAll(): Promise<Array<Trip>>;
}
  