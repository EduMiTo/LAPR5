import { Mapper } from "../core/infra/Mapper";

import { ITripDTO } from "../dto/ITripDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Trip } from "../domain/trip";

export class TripMap extends Mapper<Trip> {

  public static toDTO( trip: Trip): ITripDTO {
    return {
      id: trip.id.toString(),
      date: trip.date,
      designation: trip.designation
    } as ITripDTO;
  }

  public static async toDomain (raw: any): Promise<Trip> {
    

    const tripOrError = Trip.create({
      date: raw.date,
      designation: raw.designation
    }, new UniqueEntityID(raw.id))
    
    tripOrError.isFailure ? console.log(tripOrError.error) : '';
    
    return tripOrError.isSuccess ? tripOrError.getValue() : null;
  }

  public static toPersistence (trip: Trip): any {
    const a = {
      id: trip.id,
      date: trip.date,
      designation: trip.designation
    }
    return a;
  }

  
}