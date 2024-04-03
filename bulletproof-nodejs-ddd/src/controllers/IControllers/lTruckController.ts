import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  getTruckByPlate(req: Request, res: Response, next: NextFunction);
  getTrucks(req: Request, res: Response, next: NextFunction);
  deleteTruck(req: Request, res: Response, next: NextFunction);
  inhibitTruck(req: Request, res: Response, next: NextFunction);
  activateTruck(req: Request, res: Response, next: NextFunction);
}