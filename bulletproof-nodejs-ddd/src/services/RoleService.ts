import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoleDTO from '../dto/IRoleDTO';
import { Role } from "../domain/role";
import IRoleRepo from '../services/IRepos/IRoleRepo';
import IUserRepo from '../services/IRepos/IUserRepo';
import IRoleService from './IServices/IRoleService';
import { Result } from "../core/logic/Result";
import { RoleMap } from "../mappers/RoleMap";

@Service()
export default class RoleService implements IRoleService {
  constructor(
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject(config.repos.user.name) private userRepo : IUserRepo
  ) {}
 
 

  public async getRole( roleId: string): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleId);

      if (role === null) {
        return Result.fail<IRoleDTO>("Role not found");
      }
      else {
        const roleDTOResult = RoleMap.toDTO( role ) as IRoleDTO;
        return Result.ok<IRoleDTO>( roleDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {

      const roleOrError = await Role.create( roleDTO );

      if (roleOrError.isFailure) {
        return Result.fail<IRoleDTO>(roleOrError.errorValue());
      }

      const roleResult = roleOrError.getValue();

      await this.roleRepo.save(roleResult);

      const roleDTOResult = RoleMap.toDTO( roleResult ) as IRoleDTO;
      return Result.ok<IRoleDTO>( roleDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleDTO.id);

      if (role === null) {
        return Result.fail<IRoleDTO>("Role not found");
      }
      else {
        role.name = roleDTO.name;
        await this.roleRepo.save(role);

        const roleDTOResult = RoleMap.toDTO( role ) as IRoleDTO;
        return Result.ok<IRoleDTO>( roleDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

    public async getRoles(): Promise<Result<IRoleDTO[]>> {
      try {
        const rolesResult = await this.roleRepo.findAll();
        const rolesDTOResult: Array<IRoleDTO> = [];
  
        rolesResult.forEach((linha) => {
          rolesDTOResult.push(RoleMap.toDTO(linha) as IRoleDTO);
        });
        return Result.ok<Array<IRoleDTO>>(rolesDTOResult);
      } catch (e) {
        throw e;
      }
    }

    public async getUserLogistic(): Promise<Result<Number>> {
      try {
        let cont = 0;
        const rolesResult = await this.userRepo.findAll();
        const rolesDTOResult: Array<IRoleDTO> = [];
  
        rolesResult.forEach((linha) => {
          if (linha.role == "765784b7-7b42-4e9e-bf9f-58bc5439cb25")
            cont++;
        });
        return Result.ok<Number>(cont);
      } catch (e) {
        throw e;
      }
    }

    public async getUserShipping(): Promise<Result<Number>> {
      try {
        let cont = 0;
        const rolesResult = await this.userRepo.findAll();
        const rolesDTOResult: Array<IRoleDTO> = [];
  
        rolesResult.forEach((linha) => {
          
          if (linha.role == "ec89216d-dd33-4822-b80e-40bd910dfbd2")
            cont++;
        });
        return Result.ok<Number>(cont);
      } catch (e) {
        throw e;
      }
    }

    public async getUserWarehouse(): Promise<Result<Number>> {
      try {
        let cont = 0;
        const rolesResult = await this.userRepo.findAll();
        const rolesDTOResult: Array<IRoleDTO> = [];
  
        rolesResult.forEach((linha) => {
          if (linha.role == "0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3")
            cont++;
        });
        return Result.ok<Number>(cont);
      } catch (e) {
        throw e;
      }
    }

    public async getRoleByName(roleName: string): Promise<Result<IRoleDTO>> {
      try {
        const roleResult = await this.roleRepo.findByName(roleName);

        if (roleResult === null) {
            return Result.fail<IRoleDTO>("There is no role with such name.");
        }
        const role = RoleMap.toDTO(roleResult) as IRoleDTO;
        return Result.ok<IRoleDTO>(role);
    } catch (e) {
        throw e;
    }
    }

    public async getRoleNameById(id: string): Promise<Result<String>> {
      try {
        const roleResult = await this.roleRepo.findById(id);

        if (roleResult === null) {
            return Result.fail<String>("There is no role with such name.");
        }
        return Result.ok<String>(roleResult.name);
    } catch (e) {
        throw e;
    }
    }
  }


