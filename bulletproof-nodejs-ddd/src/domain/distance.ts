import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface DistanceProps {
  value: number;
}

export class Distance extends ValueObject<DistanceProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: DistanceProps) {
    super(props);
  }

  public static create (distance: number): Result<Distance> {
    const guardResult1 = Guard.againstNullOrUndefined(distance, 'distance');
    const guardResult2 = Guard.againstNegativeValues(distance, 'distance');
    if (!guardResult1.succeeded) {
      return Result.fail<Distance>(guardResult1.message);
    } else if (!guardResult2.succeeded){
        return Result.fail<Distance>(guardResult2.message);
    } else {
      return Result.ok<Distance>(new Distance({ value: distance }))
    }
  }
}