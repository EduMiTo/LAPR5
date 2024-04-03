import { AggregateRoot } from "../core/domain/AggregateRoot";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { TruckPlate } from "./truckPlate";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


interface PlanningProps {
  truckPlate: TruckPlate;
  planningDate: string;
  path: string;
  planningTime: number;
  heuristic: string;
}

export class Planning extends AggregateRoot<PlanningProps> {
    get id (): UniqueEntityID {
      return this._id;
    }

    get truckPlate (): TruckPlate {
        return this.props.truckPlate;
    }

    get planningDate (): string {
        return this.props.planningDate;
    }

    get path (): string {
        return this.props.path;
    }

    get planningTime (): number {
        return this.props.planningTime;
    }

    get heuristic (): string {
      return this.props.heuristic;
  }

  private constructor (props: PlanningProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PlanningProps, id?: UniqueEntityID): Result<Planning> {

    const guardedProps = [
      { argument: props.truckPlate, argumentName: 'truckPlate' },
      { argument: props.planningDate, argumentName: 'planningDate' },
      { argument: props.path, argumentName: 'path' },
      { argument: props.planningTime, argumentName: 'planningTime' },
      { argument: props.heuristic, argumentName: 'heuristic' }
    ];

    
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Planning>(guardResult.message)
    }     
    else {
      const planning = new Planning({
        ...props
      }, id);

      return Result.ok<Planning>(planning);
    }
  }
}