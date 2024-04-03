import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PathId } from "./pathId";
import { Distance } from "./distance";
import { Time } from "./time";
import { Energy } from "./energy";
import { Guard } from "../core/logic/Guard";


interface PathProps {
  idWarehouseStart: string;
  idWarehouseEnd: string;
  //idTrip: idTrip;
  distance: Distance;
  time: Time;
  energy: Energy;
  extraTime: Time;
}

export class Path extends AggregateRoot<PathProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get pathId (): PathId {
        return PathId.caller(this.id)
    }

    get idWarehouseStart (): string {
      return this.props.idWarehouseStart;
    }

    get idWarehouseEnd (): string {
        return this.props.idWarehouseEnd;
    }

    /*get idTrip (): IdTrip {
        return this.props.idTrip;
    }*/

    get distance (): Distance {
      return this.props.distance;
  }

    get time (): Time {
        return this.props.time;
    }

    get energy (): Energy {
        return this.props.energy;
    }

    get extraTime (): Time {
        return this.props.extraTime;
    }

    set distance (value: Distance) {
      this.props.distance = value;
    }

    set time (value: Time) {
        this.props.time = value;
    }

    set energy (value: Energy) {
        this.props.energy = value;
    }

    set extraTime (value: Time) {
        this.props.extraTime = value;
    }


  private constructor (props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PathProps, id?: UniqueEntityID): Result<Path> {

    const guardedProps = [
      { argument: props.distance, argumentName: 'distance' },
      { argument: props.time, argumentName: 'time' },
      { argument: props.energy, argumentName: 'energy' },
      { argument: props.extraTime, argumentName: 'extraTime' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Path>(guardResult.message)
    }     
    else {
      const path = new Path({
        ...props
      }, id);

      return Result.ok<Path>(path);
    }
  }
}