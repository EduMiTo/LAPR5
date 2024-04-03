import { Request, Response, NextFunction } from 'express';
import { Result } from '../../core/logic/Result';
import { IPlanningDTO } from '../../dto/IPlanningDTO';

export default interface IPlanningService  {
  performPlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
  getTruckPlanning(plate: string, date: string): Promise<Result<IPlanningDTO>>;
  getPlannings(): Promise<Result<Array<IPlanningDTO>>>;
  deletePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
}