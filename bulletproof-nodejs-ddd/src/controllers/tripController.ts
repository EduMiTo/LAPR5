import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import ITripController from './IControllers/ITripController';
import ITripService from '../services/IServices/ITripService';
import { ITripDTO } from '../dto/ITripDTO';

@Service()
export default class TripController implements ITripController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.trip.name) private tripServiceInstance : ITripService
  ) {}

  public async createTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const tripOrError = await this.tripServiceInstance.createTrip(req.body as ITripDTO) as Result<ITripDTO>;

      if (tripOrError.isFailure) {
        return res.status(400).send();
      }

      const tripDTO = tripOrError.getValue();
      return res.json( tripDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  

  public async getTripByDate(req: Request, res: Response, next: NextFunction) {
    try {
        const date = req.params.date;
        const dateOrError = await this.tripServiceInstance.getTripByDate(new Date(date)) as Result<Array<ITripDTO>>
        
        if (dateOrError.isFailure) {
            return res.status(400).send();
        }

        const post = dateOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async getTrips(req: Request, res: Response, next: NextFunction) {
    try {
      const tripsOrError = await this.tripServiceInstance.getTrips() as Result<Array<ITripDTO>>;

      if (tripsOrError.isFailure) {
        return res.status(402).send(tripsOrError.errorValue());
      }

      const tripDTO = tripsOrError.getValue();
      return res.status(200).json(tripDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

}