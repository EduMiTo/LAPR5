import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPathController from './IControllers/lPathController';
import IPathService from '../services/IServices/IPathService';
import { IPathDTO } from '../dto/IPathDTO';
import IPathRepo from '../services/IRepos/IPathRepo';

@Service()
export default class PathController implements IPathController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.path.name) private pathServiceInstance : IPathService
  ) {}

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;
      
      if (pathOrError.isFailure) {
        return res.status(400).json({message: pathOrError.error});
      }

      const pathDTO = pathOrError.getValue();
      return res.json( pathDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.updatePath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).json({message: pathOrError.error});
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPaths(req: Request, res: Response, next: NextFunction) {
    try {
      const pathsOrError = await this.pathServiceInstance.getPaths() as Result<Array<IPathDTO>>;

      if (pathsOrError.isFailure) {
        return res.status(400).send(pathsOrError.errorValue());
      }

      const truckDTO = pathsOrError.getValue();
      return res.status(200).json(truckDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getPathsByWarehouseStart(req: Request, res: Response, next: NextFunction) {
    try {
        const idWharehouse = req.params.idWarehouseStart;
        const pathOrError = await this.pathServiceInstance.getPathsByWarehouseStart(idWharehouse) as Result<Array<IPathDTO>>

        if (pathOrError.isFailure) {
            return res.status(400).send();
        }

        const post = pathOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async getPathsByWarehouseEnd(req: Request, res: Response, next: NextFunction) {
    try {
        const idWharehouse = req.params.idWarehouseEnd;
        const pathOrError = await this.pathServiceInstance.getPathsByWarehouseEnd(idWharehouse) as Result<Array<IPathDTO>>

        if (pathOrError.isFailure) {
            return res.status(400).send();
        }

        const post = pathOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async getPathsByWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
        const idWharehouseStart = req.params.idWarehouseStart;
        const idWharehouseEnd = req.params.idWarehouseEnd;
        const pathOrError = await this.pathServiceInstance.getPathsByWarehouses(idWharehouseStart, idWharehouseEnd) as Result<IPathDTO>;

        if (pathOrError.isFailure) {
            return res.status(400).send();
        }

        const post = pathOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async deletePath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.deletePath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}