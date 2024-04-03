import { Service, Inject, CannotInstantiateValueError } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { TruckId } from "../domain/truckId";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck } from '../domain/truck';
import { TruckMap } from '../mappers/TruckMap';
import { TruckPlate } from '../domain/truckPlate';
import { TripId } from '../domain/tripId';
import { Trip } from '../domain/trip';
import { TripMap } from '../mappers/TripMap';
import { ITripPersistance } from '../dataschema/ITripPersistance';
import ITripRepo from '../services/IRepos/ITripRepo';

@Service()
export default class TripRepo implements ITripRepo {
  private models: any;

  constructor(
    @Inject('tripSchema') private tripSchema : Model<ITripPersistance & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (tripId: TripId | string): Promise<boolean> {

    const idX = tripId instanceof TripId ? (<TripId>tripId).id.toValue() : tripId;

    const query = { id: idX}; 
    const tripDocument = await this.tripSchema.findOne( query );

    return !!tripDocument === true;
  }

  public async save (trip: Trip): Promise<Trip> {
    const query = { id: trip.id.toString() }; 

    const tripDocument = await this.tripSchema.findOne( query );

    try {
      if (tripDocument === null ) {
        const rawTrip: any = TripMap.toPersistence(trip);

        const tripCreated = await this.tripSchema.create(rawTrip);

        return TripMap.toDomain(tripCreated);
      } else {

        tripDocument.date = trip.date;
        tripDocument.designation = trip.designation;
        
        await tripDocument.save();

        return trip;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (tripId: TripId | string): Promise<Trip> {
    const query = { id : tripId};
    const tripRecord = await this.tripSchema.findOne( query as FilterQuery<ITripPersistance & Document> );

    if( tripRecord != null) {
      return TripMap.toDomain(tripRecord);
    }
    else
      return null;
  }

  public async findByDate(date: Date| string): Promise<Array<Trip>> {
    
    const newDate = new Date(date);
    const tripRecord = await this.tripSchema.find();
    var trips:Array<Trip> =[];
    if( tripRecord != null) {
        tripRecord.forEach(async element => {
            if (element.date.toDateString() == newDate.toDateString()){
                trips.push(await TripMap.toDomain(element));
            }
        });
      return trips;
    }
    else
      return null;
  }

  public async findAll() : Promise<Array<Trip>> {
    const tripRecord = await this.tripSchema.find();
    var trips:Array<Trip> =[];
    if( tripRecord != null) {
        tripRecord.forEach(async element => {
        trips.push(await TripMap.toDomain(element));
        });
      return trips;
    }
    else
      return null;
  }
}