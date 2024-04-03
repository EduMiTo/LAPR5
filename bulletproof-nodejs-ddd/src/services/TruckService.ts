import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITruckService from './IServices/ITruckService';
import ITruckRepo from './IRepos/ITruckRepo';
import { ITruckDTO } from '../dto/ITruckDTO';
import { Truck } from '../domain/truck';
import { TruckMap } from '../mappers/TruckMap';

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}

  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      truckDTO.active = true;
      
      const truckOrError = await Truck.create( truckDTO );

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      const truckR = await this.truckRepo.save(truckResult);

      if (typeof truckR === "string") return Result.fail<ITruckDTO>(truckR);

      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;

      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.plate.toString());
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found.");
      }
      else {
        
        if (truckDTO.tare != null) truck.tare = truckDTO.tare;
        if (truckDTO.massCapacity != null) truck.massCapacity = truckDTO.massCapacity;
        if (truckDTO.maximumBattery != null) truck.maximumBattery = truckDTO.maximumBattery;
        if (truckDTO.autonomy != null) truck.autonomy = truckDTO.autonomy;
        if (truckDTO.chargeTime != null) truck.chargeTime = truckDTO.chargeTime;
        
        const truckR = await this.truckRepo.save(truck);
        
        if (typeof truckR === "string") return Result.fail<ITruckDTO>(truckR);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

  public async getTruckByPlate(plate: string): Promise<Result<ITruckDTO>>{
    try {
        const truckResult = await this.truckRepo.findByPlate(plate);

        if (truckResult === null) {
            return Result.fail<ITruckDTO>("There is no truck with such plate.");
        }
        const truck = TruckMap.toDTO(truckResult) as ITruckDTO;
        return Result.ok<ITruckDTO>(truck);
    } catch (e) {
        throw e;
    }
  }

  public async getTrucks(): Promise<Result<Array<ITruckDTO>>> {
    try {
      
      const trucksResult = await this.truckRepo.findAll();
      const trucksDTOResult: Array<ITruckDTO> = [];

      trucksResult.forEach((linha) => {
        trucksDTOResult.push(TruckMap.toDTO(linha) as ITruckDTO);
      });

      return Result.ok<Array<ITruckDTO>>(trucksDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async deleteTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.plate.toString());
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found.");
      }
      else { 
        const truckR = await this.truckRepo.delete(truck);
        if (truckR === null) return Result.fail<ITruckDTO>('Invalid arguments.');

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

  public async inhibitTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.plate.toString());
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found.");
      }
      else { 
        const truckR = await this.truckRepo.inhibit(truck);
        if (truckR === null) return Result.fail<ITruckDTO>('Invalid arguments.');

        const truckDTOResult = TruckMap.toDTO( truckR ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

  public async activateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    
    try {
      const truck = await this.truckRepo.findByPlate(truckDTO.plate.toString());
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found.");
      }
      else { 
        const truckR = await this.truckRepo.activate(truck);
        if (truckR === null) return Result.fail<ITruckDTO>('Invalid arguments.');

        const truckDTOResult = TruckMap.toDTO( truckR ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult );
        }
    } catch (e) {
      throw e;
    }
  }

}
