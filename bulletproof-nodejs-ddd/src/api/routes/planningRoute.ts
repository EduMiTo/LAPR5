import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPlanningController from '../../controllers/IControllers/IPlanningController';

const route = Router();

export default (app: Router) => {
  app.use('/Planning', route);

  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

  route.post('',
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required(),
        planningDate: Joi.string().required(),
        path: Joi.string().required(),
        planningTime: Joi.number().required(),
        heuristic: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.performPlanning(req, res, next) );
  
    route.get('/:plate/:date',
      celebrate({
        body: Joi.object({
            truckPlate: Joi.string().required(),
            planningDate: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.getTruckPlanning(req, res, next) );

    route.get('', (req, res, next) => ctrl.getPlannings(req, res, next));

    route.delete('/deletePlanning',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      }),
    }),
    
    (req, res, next) => ctrl.deletePlanning(req, res, next) );

};