import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";
import { Distance } from "./distance";
import { Time } from "./time";
import { Weight } from "./weight";
import { Energy } from "./energy";
import { Guard } from "../core/logic/Guard";
import { TruckPlate } from "./truckPlate";


interface TruckProps {
  plate: TruckPlate;
  tare: Weight;
  massCapacity: Weight;
  maximumBattery: Energy;
  autonomy: Distance;
  chargeTime: Time;
  active: boolean;
}

export class Truck extends AggregateRoot<TruckProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get truckId (): TruckId {
        return TruckId.caller(this.id)
    }

    get plate (): TruckPlate {
      return this.props.plate;
    }

    get tare (): Weight {
        return this.props.tare;
    }

    get massCapacity (): Weight {
        return this.props.massCapacity
    }

    get maximumBattery (): Energy {
        return this.props.maximumBattery;
    }

    get autonomy (): Distance {
        return this.props.autonomy;
    }

    get chargeTime (): Time {
        return this.props.chargeTime;
    }

    get active (): boolean {
      return this.props.active;
    }

    set plate (value: TruckPlate) {
      this.props.plate = value;
    }

    set tare (value: Weight) {
        this.props.tare = value;
    }

    set massCapacity (value: Weight) {
        this.props.massCapacity = value;
    }

    set maximumBattery (value: Energy) {
        this.props.maximumBattery = value;
    }

    set autonomy (value: Distance) {
        this.props.autonomy = value;
    }

    set chargeTime (value: Time) {
        this.props.chargeTime = value;
    }

    set active (value: boolean) {
      this.props.active = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: TruckProps, id?: UniqueEntityID): Result<Truck> {

    const guardedProps = [
      { argument: props.plate, argumentName: 'plate' },
      { argument: props.tare, argumentName: 'tare' },
      { argument: props.massCapacity, argumentName: 'massCapacity' },
      { argument: props.maximumBattery, argumentName: 'maximumBattery' },
      { argument: props.autonomy, argumentName: 'autonomy' },
      { argument: props.chargeTime, argumentName: 'chargeTime' },
      { argument: props.active, argumentName: 'active' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Truck>(guardResult.message)
    }     
    else {
      const truck = new Truck({
        ...props
      }, id);

      return Result.ok<Truck>(truck);
    }
  }
}