import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Planning } from "../domain/planning";
import { IPlanningDTO } from "../dto/IPlanningDTO";

export class PlanningMap extends Mapper<Planning> {

  public static toDTO( planning: Planning): IPlanningDTO {
    return {
      id: planning.id.toString(),
      truckPlate: planning.truckPlate,
      planningDate: planning.planningDate.toString(),
      path: planning.path.toString(),
      planningTime: planning.planningTime,
      heuristic: planning.heuristic.toString(),
    } as IPlanningDTO;
  }

  public static async toDomain (raw: any): Promise<Planning> {
    

    const planningOrError = Planning.create({
      truckPlate: raw.truckPlate,
      planningDate: raw.planningDate,
      path: raw.path,
      planningTime: raw.planningTime,
      heuristic: raw.heuristic
    }, new UniqueEntityID(raw.id))
    
    planningOrError.isFailure ? console.log(planningOrError.error) : '';
    
    return planningOrError.isSuccess ? planningOrError.getValue() : null;
  }

  public static toPersistence (planning: Planning): any {
    const a = {
        id: planning.id,
        truckPlate: planning.truckPlate,
        planningDate: planning.planningDate,
        path: planning.path,
        planningTime: planning.planningTime,
        heuristic: planning.heuristic
    }
    return a;
  }
}