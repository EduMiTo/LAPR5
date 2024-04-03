import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPathService from './IServices/IPathService';
import IPathRepo from './IRepos/IPathRepo';
import { IPathDTO } from '../dto/IPathDTO';
import { Path } from '../domain/path';
import { PathMap } from '../mappers/PathMap';

@Service()
export default class PathService implements IPathService {
  constructor(
      @Inject(config.repos.path.name) private pathRepo : IPathRepo
  ) {}

  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      
      const pathOrError = await Path.create( pathDTO );
      
      if (pathOrError.isFailure) {
        
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }
      
      const pathResult = pathOrError.getValue();

      const pathR = await this.pathRepo.save(pathResult);

      if (typeof pathR === "string") return Result.fail<IPathDTO>(pathR);

      const pathDTOResult = PathMap.toDTO( pathResult ) as IPathDTO;
      return Result.ok<IPathDTO>( pathDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByWarehouses(pathDTO.idWarehouseStart, pathDTO.idWarehouseEnd);
      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        if (pathDTO.distance != null) path.distance = pathDTO.distance;
        if (pathDTO.time != null) path.time = pathDTO.time;
        if (pathDTO.energy != null) path.energy = pathDTO.energy;
        if (pathDTO.extraTime != null) path.extraTime = pathDTO.extraTime;
        const pathR = await this.pathRepo.save(path);

        if (typeof pathR === "string") return Result.fail<IPathDTO>(pathR);

        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getPaths(): Promise<Result<Array<IPathDTO>>> {
    try {
      const pathsResult = await this.pathRepo.findAll();
      const pathsDTOResult: Array<IPathDTO> = [];

      pathsResult.forEach((linha) => {
        pathsDTOResult.push(PathMap.toDTO(linha) as IPathDTO);
      });
      return Result.ok<Array<IPathDTO>>(pathsDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getPathsByWarehouseStart(idWarehouseStart: string): Promise<Result<Array<IPathDTO>>>{
    try {
        const pathsResult = await this.pathRepo.findByWarehouseStart(idWarehouseStart);
        const pathsDTOResult: Array<IPathDTO> = [];

        pathsResult.forEach((linha) => {
          pathsDTOResult.push(PathMap.toDTO(linha) as IPathDTO);
        });
        return Result.ok<Array<IPathDTO>>(pathsDTOResult);
    } catch (e) {
        throw e;
    }
  }

  public async getPathsByWarehouseEnd(idWarehouseEnd: string): Promise<Result<Array<IPathDTO>>>{
    try {
        const pathsResult = await this.pathRepo.findByWarehouseEnd(idWarehouseEnd);
        const pathsDTOResult: Array<IPathDTO> = [];

        pathsResult.forEach((linha) => {
          pathsDTOResult.push(PathMap.toDTO(linha) as IPathDTO);
        });
        return Result.ok<Array<IPathDTO>>(pathsDTOResult);
    } catch (e) {
        throw e;
    }
  }

  public async getPathsByWarehouses(idWarehouseStart: string, idWarehouseEnd: string): Promise<Result<IPathDTO>>{
    try {
        const pathsResult = await this.pathRepo.findByWarehouses(idWarehouseStart, idWarehouseEnd);
        const pathsDTOResult: IPathDTO = PathMap.toDTO(pathsResult) as IPathDTO;

        return Result.ok<IPathDTO>(pathsDTOResult);
    } catch (e) {
        throw e;
    }
  }

  public async deletePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathDTO.id.toString());
      if (path === null) {
        return Result.fail<IPathDTO>("Path not found.");
      }
      else { 
        const pathR = await this.pathRepo.delete(path);
        if (pathR === null) return Result.fail<IPathDTO>('Invalid arguments.');

        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

}
