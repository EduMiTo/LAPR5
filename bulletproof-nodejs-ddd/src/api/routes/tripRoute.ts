import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITripController from '../../controllers/IControllers/ITripController';

const route = Router();

export default (app: Router) => {
  app.use('/Trips', route);

  const ctrl = Container.get(config.controllers.trip.name) as ITripController;

  route.post('',
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        date: Joi.date().required()
      })
    }),
    (req, res, next) => ctrl.createTrip(req, res, next) );
  
    route.get('/:date',
      celebrate({
        body: Joi.object({
            date: Joi.date().required(),
        }),
      }),
      (req, res, next) => ctrl.getTripByDate(req, res, next) );

    route.get('', (req, res, next) => ctrl.getTrips(req, res, next));
};