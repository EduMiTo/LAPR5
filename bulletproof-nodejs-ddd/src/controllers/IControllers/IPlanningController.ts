import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  performPlanning(req: Request, res: Response, next: NextFunction);
  getTruckPlanning(req: Request, res: Response, next: NextFunction);
  getPlannings(req: Request, res: Response, next: NextFunction);
  deletePlanning(req: Request, res: Response, next: NextFunction);
}