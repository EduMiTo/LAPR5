import { Service, Inject, CannotInstantiateValueError } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { TruckId } from "../domain/truckId";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck } from '../domain/truck';
import { TruckMap } from '../mappers/TruckMap';
import { TruckPlate } from '../domain/truckPlate';

@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(
    @Inject('truckSchema') private truckSchema : Model<ITruckPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (truckId: TruckId | string): Promise<boolean> {

    const idX = truckId instanceof TruckId ? (<TruckId>truckId).id.toValue() : truckId;

    const query = { id: idX}; 
    const truckDocument = await this.truckSchema.findOne( query );

    return !!truckDocument === true;
  }

  public async save (truck: Truck): Promise<Truck> {
    const query = { id: truck.id.toString() }; 

    const truckDocument = await this.truckSchema.findOne( query );

    try {
      if (truckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        if (TruckMap.isValid(truck) != true){
          return TruckMap.isValid(truck);
        }

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {

        if (TruckMap.isValid(truck) != true){
          return TruckMap.isValid(truck);
        }

        truckDocument.plate = truck.plate;
        truckDocument.tare = truck.tare;
        truckDocument.massCapacity = truck.massCapacity;
        truckDocument.maximumBattery = truck.maximumBattery;
        truckDocument.autonomy = truck.autonomy;
        truckDocument.chargeTime = truck.chargeTime;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (truckId: TruckId | string): Promise<Truck> {
    const query = { id : truckId};
    const truckRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }

  public async findByPlate(plate: TruckPlate| string): Promise<Truck> {
    const pplate = plate instanceof TruckPlate ? (<TruckPlate>plate).value : plate;
    const query = {plate: pplate}
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);
    return truckRecord !==null ? TruckMap.toDomain(truckRecord) : null;
  }

  public async findAll() : Promise<Array<Truck>> {
    const truckRecord = await this.truckSchema.find();
    var trucks:Array<Truck> =[];
    if( truckRecord != null) {
      truckRecord.forEach(async element => {
        trucks.push(await TruckMap.toDomain(element));
        });
      return trucks;
    }
    else
      return null;
  }

  public async delete (truck: Truck): Promise<Truck> {
    const query = { id: truck.id.toString() }; 

    try {

      const truckRecord = await this.truckSchema.findOneAndDelete(query);

      if (truckRecord != null) {
        return TruckMap.toDomain(truckRecord);
      }

    } catch (err) {
      throw err;
    }
  }

  public async inhibit (truck: Truck): Promise<Truck> {
    const query = { id: truck.id.toString() }; 

    try {

      const truckRecord = await this.truckSchema.findOne( query );

      truckRecord.active = false;

      await truckRecord.save();

      return TruckMap.toDomain(truckRecord);

    } catch (err) {
      throw err;
    }
  }

  public async activate (truck: Truck): Promise<Truck> {
    const query = { id: truck.id.toString() }; 

    try {

      const truckRecord = await this.truckSchema.findOne( query );

      truckRecord.active = true;

      await truckRecord.save();

      return TruckMap.toDomain(truckRecord);

    } catch (err) {
      throw err;
    }
  }
}
