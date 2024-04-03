import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IPlanningDTO } from '../dto/IPlanningDTO';
import IPlanningService from '../services/IServices/IPlanningService';
import IPlanningController from './IControllers/IPlanningController';

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.planning.name) private planningServiceInstance : IPlanningService
  ) {}
  public async performPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.performPlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(400).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(200).json( planningDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPlannings(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.getPlannings() as Result<Array<IPlanningDTO>>;

      if (planningOrError.isFailure) {
        return res.status(400).send(planningOrError.errorValue());
      }

      const planningDTO = planningOrError.getValue();
      return res.status(200).json(planningDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getTruckPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.params.plate;
      const date = req.params.date;
      const planningOrError = await this.planningServiceInstance.getTruckPlanning(plate, date) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(400).send(planningOrError.errorValue());
      }

      const planningDTO = planningOrError.getValue();
      return res.status(200).json(planningDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async deletePlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.deletePlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(400).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(200).json( planningDTO );
    }
    catch (e) {
      return next(e);
    }
  };


}