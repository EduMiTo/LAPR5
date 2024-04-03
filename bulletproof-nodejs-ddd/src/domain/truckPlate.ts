import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TruckPlateProps {
  value: string;
}

export class TruckPlate extends ValueObject<TruckPlateProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: TruckPlateProps) {
    super(props);
  }

  public static create (plate: string): Result<TruckPlate> {
    const guardResult1 = Guard.againstNullOrUndefined(plate, 'plate');
    const guardResult2 = Guard.againstInvalidPlates(plate, 'plate');
    if (!guardResult1.succeeded) {
      return Result.fail<TruckPlate>(guardResult1.message);
    } else if (!guardResult2.succeeded){
        return Result.fail<TruckPlate>(guardResult2.message);
    } else {
      return Result.ok<TruckPlate>(new TruckPlate({ value: plate }))
    }
  }
}