import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITripService from './IServices/ITripService';
import { ITripDTO } from '../dto/ITripDTO';
import { Trip } from '../domain/trip';
import ITripRepo from './IRepos/ITripRepo';
import { TripMap } from '../mappers/TripMap';

@Service()
export default class TripService implements ITripService {
  constructor(
      @Inject(config.repos.trip.name) private tripRepo : ITripRepo
  ) {}

  public async createTrip(tripDTO: ITripDTO): Promise<Result<ITripDTO>> {
    try {

      const tripOrError = await Trip.create( tripDTO );

      if (tripOrError.isFailure) {
        return Result.fail<ITripDTO>(tripOrError.errorValue());
      }

      const tripResult = tripOrError.getValue();

      const tripR = await this.tripRepo.save(tripResult);

      if (tripR === null) return Result.fail<ITripDTO>('Invalid arguments.');

      const tripDTOResult = TripMap.toDTO( tripResult ) as ITripDTO;

      return Result.ok<ITripDTO>( tripDTOResult )
    } catch (e) {
      throw e;
    }
  }

  

  public async getTripByDate(date: Date): Promise<Result<Array<ITripDTO>>> {
    try {
        const tripsResult = await this.tripRepo.findByDate(date);
        const tripsDTOResult: Array<ITripDTO> = [];
  
        tripsResult.forEach((linha) => {
          tripsDTOResult.push(TripMap.toDTO(linha) as ITripDTO);
        });
        return Result.ok<Array<ITripDTO>>(tripsDTOResult);
      } catch (e) {
        throw e;
      }
  }

  public async getTrips(): Promise<Result<Array<ITripDTO>>> {
    try {
      const tripsResult = await this.tripRepo.findAll();
      const tripsDTOResult: Array<ITripDTO> = [];

      tripsResult.forEach((linha) => {
        tripsDTOResult.push(TripMap.toDTO(linha) as ITripDTO);
      });
      return Result.ok<Array<ITripDTO>>(tripsDTOResult);
    } catch (e) {
      throw e;
    }
  }

}
