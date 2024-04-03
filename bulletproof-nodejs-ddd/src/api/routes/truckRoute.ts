import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITruckController from '../../controllers/IControllers/lTruckController';

const route = Router();

export default (app: Router) => {
  app.use('/Trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        plate: Joi.string().required(),
        tare: Joi.required(),
        massCapacity: Joi.required(),
        maximumBattery: Joi.required(),
        autonomy: Joi.required(),
        chargeTime: Joi.required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        plate: Joi.string().required(),
        tare: Joi.number(),
        massCapacity: Joi.number(),
        maximumBattery: Joi.number(),
        autonomy: Joi.number(),
        chargeTime: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        })
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );
  
    route.get('/:plate',
      celebrate({
        body: Joi.object({
          plate: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.getTruckByPlate(req, res, next) );

    route.get('', (req, res, next) => ctrl.getTrucks(req, res, next));

    route.delete('',
      celebrate({
        body: Joi.object({
          plate: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.deleteTruck(req, res, next) );
    
    route.delete('/SoftDelete',
      celebrate({
        body: Joi.object({
          plate: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.inhibitTruck(req, res, next) );
    
    route.patch('/Activate',
      celebrate({
        body: Joi.object({
          plate: Joi.string().required(),
        tare: Joi.number(),
        massCapacity: Joi.number(),
        maximumBattery: Joi.number(),
        autonomy: Joi.number(),
        chargeTime: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        }),
        active: Joi.boolean()
        }),
      }),
      (req, res, next) => ctrl.activateTruck(req, res, next) );
};