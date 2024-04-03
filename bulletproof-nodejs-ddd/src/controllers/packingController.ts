import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPackingController from './IControllers/IPackingController';
import IPackingService from '../services/IServices/IPackingService';
import { IPackingDTO } from '../dto/IPackingDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PackingController implements IPackingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.packing.name) private packingServiceInstance : IPackingService
  ) {}
 
  public async updatePacking(req: Request, res: Response, next: NextFunction) {
    try {
      const packingOrError = await this.packingServiceInstance.updatePacking(req.body as IPackingDTO) as Result<IPackingDTO>;

      if (packingOrError.isFailure) {
        return res.status(400).json({message: packingOrError.error});
      }

      const packingDTO = packingOrError.getValue();
      return res.status(200).json( packingDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async createPacking(req: Request, res: Response, next: NextFunction) {
    try {
      const packingOrError = await this.packingServiceInstance.createPacking(req.body as IPackingDTO) as Result<IPackingDTO>;

      if (packingOrError.isFailure) {
        return res.status(400).json({message: packingOrError.error});
      }

      const packingDTO = packingOrError.getValue();
      return res.json( packingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPackings(req: Request, res: Response, next: NextFunction) {
    try {
      const packingsOrError = await this.packingServiceInstance.getPackings() as Result<Array<IPackingDTO>>;

      if (packingsOrError.isFailure) {
        return res.status(400).send(packingsOrError.errorValue());
      }

      const packingDTO = packingsOrError.getValue();
      return res.status(200).json(packingDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getPackingById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.id;
      const packingsOrError = await this.packingServiceInstance.getPackingById(id) as Result<IPackingDTO>;

      if (packingsOrError.isFailure) {
        return res.status(400).send(packingsOrError.errorValue());
      }

      const packingDTO = packingsOrError.getValue();
      return res.status(200).json(packingDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getPackingsByDeliveryId(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryId = req.body.deliveryId;
      const packingsOrError = await this.packingServiceInstance.getPackingsByDeliveryId(deliveryId) as Result<Array<IPackingDTO>>;

      if (packingsOrError.isFailure) {
        return res.status(400).send(packingsOrError.errorValue());
      }

      const packingDTO = packingsOrError.getValue();
      return res.status(200).json(packingDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getPackingsByTruckPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const truckPlate = req.params.truckPlate;
      const packingsOrError = await this.packingServiceInstance.getPackingsByTruckPlate(truckPlate) as Result<Array<IPackingDTO>>;

      if (packingsOrError.isFailure) {
        return res.status(400).send(packingsOrError.errorValue());
      }

      const packingDTO = packingsOrError.getValue();
      return res.status(200).json(packingDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getDeliveriesByTruckAndDate(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.packingServiceInstance.getDeliveriesByTruckAndDate(req.params) as Result<Array<String>>;

      if (truckOrError.isFailure) {
        return res.status(400).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async deletePacking(req: Request, res: Response, next: NextFunction) {
    try {

      console.log("ID: " + req.body.id);
      const packingOrError = await this.packingServiceInstance.deletePacking(req.body as IPackingDTO) as Result<IPackingDTO>;

      if (packingOrError.isFailure) {
        return res.status(400).send();
      }

      const packingDTO = packingOrError.getValue();
      return res.status(200).json( packingDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}