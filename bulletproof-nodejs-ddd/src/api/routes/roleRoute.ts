import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController'; 

import config from "../../../config";
import { identity } from 'lodash';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRole(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next) );

    route.get('', (req, res, next) => ctrl.getRoles(req, res, next));

    route.get('/userLogistic', (req, res, next) => ctrl.getUserLogistic(req, res, next));

    route.get('/userShipping', (req, res, next) => ctrl.getUserShipping(req, res, next));

    route.get('/userWarehouse', (req, res, next) => ctrl.getUserWarehouse(req, res, next));

    route.get('/:name',
      celebrate({
        body: Joi.object({
          name: Joi.string().required(),
        }),
      }),
      (req, res, next) => ctrl.getRoleByName(req, res, next) );

      route.get('/getRoleById/:id', (req, res, next) => ctrl.getRoleNameById(req, res, next) );



  
};