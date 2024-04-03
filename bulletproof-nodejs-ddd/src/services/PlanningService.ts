import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IPackingDTO } from '../dto/IPackingDTO';
import { PackingMap } from '../mappers/PackingMap';
import IPlanningService from './IServices/IPlanningService';
import { IPlanningDTO } from '../dto/IPlanningDTO';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';
import IPlanningRepo from './IRepos/IPlanningRepo';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
      @Inject(config.repos.planning.name) private planningRepo : IPlanningRepo
  ) {}

    public async performPlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
        try {
      
            const planningOrError = await Planning.create( planningDTO );
            
            if (planningOrError.isFailure) {
                return Result.fail<IPlanningDTO>(planningOrError.errorValue());
            }
            
            const planningResult = planningOrError.getValue();

            const planningR = await this.planningRepo.save(planningResult);

            if (planningR === null) return Result.fail<IPlanningDTO>('Invalid arguments.');

            const planningDTOResult = PlanningMap.toDTO( planningResult ) as IPlanningDTO;

            return Result.ok<IPlanningDTO>( planningDTOResult )
        } catch (e) {
        throw e;
        }
    }
    
    public async getTruckPlanning(plate: string, date: string): Promise<Result<IPlanningDTO>> {
        try {
            const planningResult = await this.planningRepo.findByPlateAndDate(plate, date);
    
            if (planningResult === null) {
                return Result.fail<IPlanningDTO>("There is no planning with such plate and date.");
            }
            const planning = PlanningMap.toDTO(planningResult) as IPlanningDTO;
            return Result.ok<IPlanningDTO>(planning);
        } catch (e) {
            throw e;
        }
    }

    public async getPlannings(): Promise<Result<IPlanningDTO[]>> {
        try {
            const planningsResult = await this.planningRepo.findAll();
            const planningsDTOResult: Array<IPlanningDTO> = [];
      
            planningsResult.forEach((linha) => {
                planningsDTOResult.push(PlanningMap.toDTO(linha) as IPlanningDTO);
            });
            return Result.ok<Array<IPlanningDTO>>(planningsDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async deletePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
        try {
          const planning = await this.planningRepo.findByID(planningDTO.id.toString());
          if (planning === null) {
            return Result.fail<IPlanningDTO>("Path not found.");
          }
          else { 
            const planningR = await this.planningRepo.delete(planning);
            if (planningR === null) return Result.fail<IPlanningDTO>('Invalid arguments.');
    
            const pathDTOResult = PlanningMap.toDTO( planning ) as IPlanningDTO;
            return Result.ok<IPlanningDTO>( pathDTOResult );
            }
        } catch (e) {
          throw e;
        }
      }

}
