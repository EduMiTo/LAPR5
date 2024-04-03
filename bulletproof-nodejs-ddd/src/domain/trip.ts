import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { TripId } from "./tripId";
import { TripDesignation } from "./tripDesignation";


interface TripProps {
  date: Date;
  designation: TripDesignation;
}

export class Trip extends AggregateRoot<TripProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get date (): Date {
        return this.props.date;
    }

    get tripId (): TripId {
      return TripId.caller(this.id)
    }

    get designation (): TripDesignation {
        return this.props.designation;
    }

    set date (value: Date) {
        this.props.date = value;
    }

    set designation (value: TripDesignation) {
      this.props.designation = value;
  }

  private constructor (props: TripProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: TripProps, id?: UniqueEntityID): Result<Trip> {

    const guardedProps = [
      { argument: props.date, argumentName: 'date' },
      { argument: props.designation, argumentName: 'designation' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Trip>(guardResult.message)
    }     
    else {
      const trip = new Trip({
        ...props
      }, id);

      return Result.ok<Trip>(trip);
    }
  }
}