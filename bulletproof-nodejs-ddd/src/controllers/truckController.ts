import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import ITruckController from './IControllers/lTruckController';
import ITruckService from '../services/IServices/ITruckService';
import { ITruckDTO } from '../dto/ITruckDTO';
import ITruckRepo from '../services/IRepos/ITruckRepo';

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).json({message: truckOrError.error});
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
      
      if (truckOrError.isFailure) {
        return res.status(400).json({message: truckOrError.error});
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getTruckByPlate(req: Request, res: Response, next: NextFunction) {
    try {
        const plate = req.params.plate;
        const plateOrError = await this.truckServiceInstance.getTruckByPlate(plate) as Result<ITruckDTO>

        if (plateOrError.isFailure) {
            return res.status(400).send();
        }

        const post = plateOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const trucksOrError = await this.truckServiceInstance.getTrucks() as Result<Array<ITruckDTO>>;
      if (trucksOrError.isFailure) {
        return res.status(400).send(trucksOrError.errorValue());
      }

      const truckDTO = trucksOrError.getValue();
      return res.status(200).json(truckDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async deleteTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.deleteTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async inhibitTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.inhibitTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async activateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.activateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}