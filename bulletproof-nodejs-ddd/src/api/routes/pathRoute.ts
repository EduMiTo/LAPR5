import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPathController from '../../controllers/IControllers/lPathController';

const route = Router();

export default (app: Router) => {
  app.use('/Paths', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  route.post('',
    celebrate({
      body: Joi.object({
        idWarehouseStart: Joi.string().required(),
        idWarehouseEnd: Joi.string().required(),
        //idTrip: Joi.required(),
        distance: Joi.required(),
        time: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        }),
        energy: Joi.required(),
        extraTime: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        }),
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        idWarehouseStart: Joi.required(),
        idWarehouseEnd: Joi.required(),
        //idTrip: Joi.required(),
        distance: Joi,
        time: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        }),
        energy: Joi,
        extraTime: Joi.object({
          hours: Joi.number(),
          minutes: Joi.number(),
          seconds: Joi.number()
        }),
      }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next) );

    route.get('', (req, res, next) => ctrl.getPaths(req, res, next));

    route.get('/:idWarehouseStart',
    celebrate({
      body: Joi.object({
        idWarehouseStart: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getPathsByWarehouseStart(req, res, next) );

    route.get('/:idWarehouseEnd/findAll',
    celebrate({
      body: Joi.object({
        idWarehouseEnd: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getPathsByWarehouseEnd(req, res, next) );

    route.get('/:idWarehouseStart/:idWarehouseEnd',
    celebrate({
      body: Joi.object({
        idWarehouseStart: Joi.string().required(),
        idWarehouseEnd: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getPathsByWarehouses(req, res, next) );

    route.delete('',
      celebrate({
        body: Joi.object({
          id: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.deletePath(req, res, next) );
};