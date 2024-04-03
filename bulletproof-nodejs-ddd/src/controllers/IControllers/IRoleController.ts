import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  createRole(req: Request, res: Response, next: NextFunction);
  updateRole(req: Request, res: Response, next: NextFunction);
  getRoles(req: Request, res: Response, next: NextFunction);
  getRoleByName(req: Request, res: Response, next: NextFunction);
  getRoleNameById(req: Request, res: Response, next: NextFunction);
  getUserLogistic(req: Request, res: Response, next: NextFunction);
  getUserShipping(req: Request, res: Response, next: NextFunction);
  getUserWarehouse(req: Request, res: Response, next: NextFunction);
}