import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { TruckPlate } from "./truckPlate";
import { Position } from "./position";
import { PackingId } from "./packingId";


interface PackingProps {
  truckPlate: TruckPlate;
  deliveryId: string;
  position: Position;
}

export class Packing extends AggregateRoot<PackingProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get packingId (): UniqueEntityID {
        return this.packingId;
    }

    get truckPlate (): TruckPlate {
        return this.props.truckPlate;
    }

    get deliveryId (): string {
        return this.props.deliveryId;
    }

    get position (): Position {
        return this.props.position;
    }

    set position (value: Position) {
      this.props.position = value;
    }


  private constructor (props: PackingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PackingProps, id?: UniqueEntityID): Result<Packing> {

    const guardedProps = [
      { argument: props.truckPlate, argumentName: 'truckPlate' },
      { argument: props.deliveryId, argumentName: 'deliveryId' },
      { argument: props.position, argumentName: 'position' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Packing>(guardResult.message)
    }     
    else {
      const packing = new Packing({
        ...props
      }, id);

      return Result.ok<Packing>(packing);
    }
  }
}