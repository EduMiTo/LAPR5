import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IPackingDTO } from '../dto/IPackingDTO';
import { PackingMap } from '../mappers/PackingMap';
import IPackingService from './IServices/IPackingService';
import { Packing } from '../domain/packing';
import IPackingRepo from './IRepos/IPackingRepo';
import { TruckPlate } from '../domain/truckPlate';

@Service()
export default class PackingService implements IPackingService {
  constructor(
      @Inject(config.repos.packing.name) private packingRepo : IPackingRepo
  ) {}

  public async createPacking(packingDTO: IPackingDTO): Promise<Result<IPackingDTO>> {
    try {
      
      const packingOrError = await Packing.create( packingDTO );
      
      if (packingOrError.isFailure) {
        return Result.fail<IPackingDTO>(packingOrError.errorValue());
      }
      
      const packingResult = packingOrError.getValue();

      const packingR = await this.packingRepo.save(packingResult);

      if (typeof packingR === "string") return Result.fail<IPackingDTO>(packingR);

      await this.packingRepo.save(packingResult);

      const packingDTOResult = PackingMap.toDTO( packingResult ) as IPackingDTO;
      return Result.ok<IPackingDTO>( packingDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePacking(packingDTO: IPackingDTO): Promise<Result<IPackingDTO>> {
    try {
      const packing = await this.packingRepo.findByDomainId(packingDTO.id);

      if (packing === null) {
        return Result.fail<IPackingDTO>("Packing not found");
      }
      else {
        packing.position = packingDTO.position;
        
        const packingR = await this.packingRepo.save(packing);

        if (typeof packingR === "string") return Result.fail<IPackingDTO>(packingR);

        const packingDTOResult = PackingMap.toDTO( packing ) as IPackingDTO;
        return Result.ok<IPackingDTO>( packingDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getPackings(): Promise<Result<Array<IPackingDTO>>> {
    try {
      const packingsResult = await this.packingRepo.findAll();
      const packingsDTOResult: Array<IPackingDTO> = [];

      packingsResult.forEach((linha) => {
        packingsDTOResult.push(PackingMap.toDTO(linha) as IPackingDTO);
      });
      return Result.ok<Array<IPackingDTO>>(packingsDTOResult);
    } catch (e) {
      throw e;
    }
  }
  
  public async getPackingsByDeliveryId(deliveryId: string): Promise<Result<Array<IPackingDTO>>> {
    try {
      const packingsResult = await this.packingRepo.findByDeliveryId(deliveryId);
      const packingsDTOResult: Array<IPackingDTO> = [];

      packingsResult.forEach((linha) => {
        packingsDTOResult.push(PackingMap.toDTO(linha) as IPackingDTO);
      });
      return Result.ok<Array<IPackingDTO>>(packingsDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getPackingById(id: string): Promise<Result<IPackingDTO>> {
    try {
      const packingResult = await this.packingRepo.findByDomainId(id);

    
      const packingDTOResult = PackingMap.toDTO( packingResult ) as IPackingDTO;
      return Result.ok<IPackingDTO>(packingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getPackingsByTruckPlate(truckPlate: string): Promise<Result<Array<IPackingDTO>>> {
    try {
      const packingsResult = await this.packingRepo.findByTruckPlate(truckPlate);
      const packingsDTOResult: Array<IPackingDTO> = [];

      packingsResult.forEach((linha) => {
        packingsDTOResult.push(PackingMap.toDTO(linha) as IPackingDTO);
      });
      return Result.ok<Array<IPackingDTO>>(packingsDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getDeliveriesByTruckAndDate(Data): Promise<Result<Array<String>>> {
    try {
      const trucksResult = await this.packingRepo.findDeliveriesByPlateAndDate(Data.plate, Data.date);
      const trucksDTOResult: Array<String> = [];

      trucksResult.forEach((linha) => {
        trucksDTOResult.push(linha);
      });
      return Result.ok<Array<String>>(trucksDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async deletePacking(pathDTO: IPackingDTO): Promise<Result<IPackingDTO>> {
    try {
      const packing = await this.packingRepo.findByDomainId(pathDTO.id.toString());
      if (packing === null) {
        return Result.fail<IPackingDTO>("Packing not found.");
      }
      else { 
        const packingR = await this.packingRepo.delete(packing);
        if (packingR === null) return Result.fail<IPackingDTO>('Invalid arguments.');

        const packingDTOResult = PackingMap.toDTO( packing ) as IPackingDTO;
        return Result.ok<IPackingDTO>( packingDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

}
