import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private roleServiceInstance : IRoleService
  ) {}

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(402).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.json( roleDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      
      const rolesOrError = await this.roleServiceInstance.getRoles() as Result<Array<IRoleDTO>>;

      if (rolesOrError.isFailure) {
        return res.status(400).send(rolesOrError.errorValue());
      }

      const truckDTO = rolesOrError.getValue();
      return res.status(200).json(truckDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getUserLogistic(req: Request, res: Response, next: NextFunction) {
    try {
      
      const role = await this.roleServiceInstance.getUserLogistic() as Result<Number>;
      
      const post = role.getValue();
      res.status(200);
      return res.json(post);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getUserShipping(req: Request, res: Response, next: NextFunction) {
    try {
      
      const role = await this.roleServiceInstance.getUserShipping() as Result<Number>;

      const post = role.getValue();
      res.status(200);
      return res.json(post);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getUserWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      
      const role = await this.roleServiceInstance.getUserWarehouse() as Result<Number>;

      const post = role.getValue();
      res.status(200);
      return res.json(post);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getRoleByName(req: Request, res: Response, next: NextFunction) {

    try {
        const roleName = req.params.name;
        const nameOrError = await this.roleServiceInstance.getRoleByName(roleName) as Result<IRoleDTO>

        if (nameOrError.isFailure) {
            return res.status(400).send();
        }

        const post = nameOrError.getValue();
        res.status(200);
        return res.json(post);
    } catch (e) {
        return next(e);
    }
  }

  public async getRoleNameById(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = req.params.id;
      const nameOrError = await this.roleServiceInstance.getRoleNameById(roleId) as Result<String>;

      if (nameOrError.isFailure) {
          return res.status(400).send();
      }

      const post = nameOrError.getValue();
      res.status(200);
      return res.json(post);
  } catch (e) {
      return next(e);
  }
  }


}