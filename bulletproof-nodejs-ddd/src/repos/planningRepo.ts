import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import fetch from 'node-fetch';
import IPackingRepo from '../services/IRepos/IPackingRepo';
import { IPackingPersistence } from '../dataschema/IPackingPersistence';
import { PackingId } from '../domain/packingId';
import { Packing } from '../domain/packing';
import { PackingMap } from '../mappers/PackingMap';
import { TruckPlate } from '../domain/truckPlate';
import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningRepo implements IPlanningRepo {
  private models: any;

  constructor(
    @Inject('planningSchema') private planningSchema : Model<IPlanningPersistence & Document>,
    @Inject('logger') private logger
  ) { }
    async exists(t: Planning): Promise<boolean> {

    const query = { id: t}; 
    const planningDocument = await this.planningSchema.findOne( query );

    return !!planningDocument === true;
    }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async save (planning: Planning): Promise<Planning> {
    if (await this.findByPlateAndDate(planning.truckPlate, planning.planningDate) != null){
      return null;
    }

    try {
        const rawPlanning: any = PlanningMap.toPersistence(planning);
        const packingCreated = await this.planningSchema.create(rawPlanning);
        
        return PlanningMap.toDomain(packingCreated);
    } catch (err) {
      throw err;
    }
  }

  public async findAll() : Promise<Array<Planning>> {
    const planningRecord = await this.planningSchema.find();
    var plannings:Array<Planning> =[];
    if( planningRecord != null) {
        planningRecord.forEach(async element => {
            plannings.push(await PlanningMap.toDomain(element));
        });
      return plannings;
    }
    else
      return null;
  }

  public async findByID(id: string): Promise<Planning> {
    const query = { id : id};
    const pathRecord = await this.planningSchema.findOne( query as FilterQuery<IPlanningPersistence & Document> );

    if( pathRecord != null) {
      return PlanningMap.toDomain(pathRecord);
    }
    else
      return null;
  }

  public async findByPlateAndDate(pplate: TruckPlate | string, ddate: string): Promise<Planning> {
    const ppplate = pplate instanceof TruckPlate ? (<TruckPlate>pplate).value : pplate;
    const query = {truckPlate: ppplate, planningDate: ddate};
    const planningRecord = await this.planningSchema.findOne(query as FilterQuery<IPlanningPersistence & Document>);
    return planningRecord !==null ? PlanningMap.toDomain(planningRecord) : null;
  }

  public async delete (planning: Planning): Promise<Planning> {
    const query = { id: planning.id.toString() }; 

    try {

      const planningRecord = await this.planningSchema.findOneAndDelete(query);
      if (planningRecord != null) {
        return PlanningMap.toDomain(planningRecord);
      }
    } catch (err) {
      throw err;
    }
  }

}
