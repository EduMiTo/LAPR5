import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import fetch from 'node-fetch';
import IPackingRepo from '../services/IRepos/IPackingRepo';
import { IPackingPersistence } from '../dataschema/IPackingPersistence';
import { PackingId } from '../domain/packingId';
import { Packing } from '../domain/packing';
import { PackingMap } from '../mappers/PackingMap';
import { TruckPlate } from '../domain/truckPlate';

@Service()
export default class PackingRepo implements IPackingRepo {
  private models: any;

  constructor(
    @Inject('packingSchema') private packingSchema : Model<IPackingPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (packingId: PackingId | string): Promise<boolean> {

    const idX = packingId instanceof PackingId ? (<PackingId>packingId).id.toValue() : packingId;

    const query = { id: idX}; 
    const packingDocument = await this.packingSchema.findOne( query );

    return !!packingDocument === true;
  }

  public async save (packing: Packing): Promise<Packing> {
    const query = { id: packing.id.toString() }; 

    const packingDocument = await this.packingSchema.findOne( query );

    try {
      if (packingDocument === null ) {
        const rawPacking: any = PackingMap.toPersistence(packing);
        
        if (PackingMap.isValid(packing) != true){
          return PackingMap.isValid(packing);
        }

        if (!(await this.truckPlateExists(packing)) || !(await this.deliveryIdExists(packing)) ){
          return null;
        }

        const packingCreated = await this.packingSchema.create(rawPacking);
        
        return PackingMap.toDomain(packingCreated);
      } else {
        if (PackingMap.isValid(packing) != true){
          return PackingMap.isValid(packing);
        }
        packingDocument.truckPlate = packing.truckPlate;
        packingDocument.deliveryId = packing.deliveryId;
        packingDocument.position = packing.position;
        await packingDocument.save();

        return packing;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (packingId: PackingId | string): Promise<Packing> {
    const query = { id : packingId};
    const packingRecord = await this.packingSchema.findOne( query as FilterQuery<IPackingPersistence & Document> );

    if( packingRecord != null) {
      return PackingMap.toDomain(packingRecord);
    }
    else
      return null;
  }

  public async findAll() : Promise<Array<Packing>> {
    const packingRecord = await this.packingSchema.find();
    var packings:Array<Packing> =[];
    if( packingRecord != null) {
        packingRecord.forEach(async element => {
            packings.push(await PackingMap.toDomain(element));
        });
      return packings;
    }
    else
      return null;
  }

  public async findByDeliveryId(deliveryId: string): Promise<Array<Packing>> {
    const packingRecord = await this.packingSchema.find();
    var packings:Array<Packing> =[];
    if( packingRecord != null) {
      packingRecord.forEach(async element => {
        if (element.deliveryId == deliveryId){
          packings.push(await PackingMap.toDomain(element));
        }
      });
      return packings;
    }
    else
      return null;
  }

  public async findByTruckPlate(truckPlate: string): Promise<Array<Packing>> {
    const packingRecord = await this.packingSchema.find();
    var packings:Array<Packing> =[];
    if( packingRecord != null) {
      packingRecord.forEach(async element => {
        if (element.truckPlate.toString() == truckPlate){
          packings.push(await PackingMap.toDomain(element));
        }
      });
      return packings;
    }
    else
      return null;
  }

  public async findDeliveriesByPlateAndDate(plate: string, date: string): Promise<Array<String>> {
    const packingRecord = await this.packingSchema.find();
    var deliveries:Array<String> =[];
    if( packingRecord != null) {
      packingRecord.forEach(async element => {
        if (element.truckPlate.toString() == plate && (await this.deliveryDateIsValid(element.deliveryId, date))){
          if (!deliveries.includes(element.deliveryId)){
            deliveries.push(element.deliveryId);
          }
        }
      });
      await this.delay(300);
      return deliveries;
    }
    else
      return null;
  }

  public async truckPlateExists (packing: Packing): Promise<any>{
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      // 👇️ const response: Response
      const response = await fetch('http://localhost:3000/api/Trucks', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result: any[] = (await response.json());
      
      let a = false;

      result.forEach( (element) => {
        
        if (packing.truckPlate == element.plate){
            a=true;
        }
      });
      console.log(a);
      if(a){
        return true;
      }
      console.log("Invalid truck plate.");
      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  public async deliveryIdExists (packing: Packing): Promise<any>{
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      // 👇️ const response: Response
      const response = await fetch('https://localhost:5001/api/Deliveries/listAll', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result: any[] = (await response.json());
      
      let a = false;

      result.forEach( (element) => {
        if (packing.deliveryId === element.id){
            a = true;
        }
      });
     
      if(a){
        return true;
      }
      
      console.log("Invalid delivery id.");
      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  public async deliveryDateIsValid (deliveryId: String, date: string): Promise<any>{
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      // 👇️ const response: Response
      const response = await fetch('http://localhost:5001/api/Deliveries/listAll', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result: any[] = (await response.json());
      
      let a = false;
      result.forEach( (element) => {
        if (deliveryId === element.id && element.limitDate.replaceAll('/', '') === date){
            a = true;
        }
      });
     
      if(a){
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  public async delete (packing: Packing): Promise<Packing> {
    const query = { id: packing.id.toString() }; 

    try {

      const packingRecord = await this.packingSchema.findOneAndDelete(query);
      if (packingRecord != null) {
        return PackingMap.toDomain(packingRecord);
      }

    } catch (err) {
      throw err;
    }
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
