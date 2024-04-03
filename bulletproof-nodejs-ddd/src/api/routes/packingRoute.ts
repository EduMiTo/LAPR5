import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPackingController from '../../controllers/IControllers/IPackingController';

const route = Router();

export default (app: Router) => {
  app.use('/Packings', route);

  const ctrl = Container.get(config.controllers.packing.name) as IPackingController;

  route.post('',
    celebrate({
      body: Joi.object({
        
        truckPlate: Joi.required(),

        deliveryId: Joi.required(),
        //warehouseId: Joi.required(),
        position: Joi.object({
          positionX: Joi.number(),
          positionY: Joi.number(),
          positionZ: Joi.number()
        }),
        
      })
    }),
    (req, res, next) => ctrl.createPacking(req, res, next) );

    route.get('', (req, res, next) => ctrl.getPackings(req, res, next));

    route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.required(),
        //warehouseId: Joi.required(),
        position: Joi.object({
          positionX: Joi.number(),
          positionY: Joi.number(),
          positionZ: Joi.number()
        }),
      }),
    }),
    (req, res, next) => ctrl.updatePacking(req, res, next) );

    route.get('/getByDeliveryId',
    celebrate({
      body: Joi.object({
        deliveryId: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getPackingsByDeliveryId(req, res, next) );

    route.get('/:truckPlate/findAll',
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required()
      }),
    }),
    
    (req, res, next) => ctrl.getPackingsByTruckPlate(req, res, next) );

    route.get('/getPackingById',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      }),
    }),
    
    (req, res, next) => ctrl.getPackingById(req, res, next) );

    route.get('/getDeliveriesByTruckAndDate/:plate/:date',
      celebrate({
        body: Joi.object({
          plate: Joi.string().required(),
          date: Joi.string().required(),
        }),
      }),
      (req, res, next) => ctrl.getDeliveriesByTruckAndDate(req, res, next));

      route.delete('/deletePacking',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      }),
    }),
    
    (req, res, next) => ctrl.deletePacking(req, res, next) );

    
};