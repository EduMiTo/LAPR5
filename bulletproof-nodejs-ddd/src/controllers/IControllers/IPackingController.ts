import { Request, Response, NextFunction } from 'express';

export default interface IPackingController  {
  createPacking(req: Request, res: Response, next: NextFunction);
  //updatePacking(req: Request, res: Response, next: NextFunction);
  getPackings(req: Request, res: Response, next: NextFunction);
  getPackingsByDeliveryId(req: Request, res: Response, next: NextFunction);
  getPackingsByTruckPlate(req: Request, res: Response, next: NextFunction);
  updatePacking(req: Request, res: Response, next: NextFunction);
  getPackingById(req: Request, res: Response, next: NextFunction);
  getDeliveriesByTruckAndDate(req: Request, res: Response, next: NextFunction);
  deletePacking(req: Request, res: Response, next: NextFunction);
}