import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface WeightProps {
  value: number;
}

export class Weight extends ValueObject<WeightProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: WeightProps) {
    super(props);
  }

  public static create (weight: number): Result<Weight> {
    const guardResult1 = Guard.againstNullOrUndefined(weight, 'weight');
    const guardResult2 = Guard.againstNegativeValues(weight, 'weight');
    if (!guardResult1.succeeded) {
      return Result.fail<Weight>(guardResult1.message);
    } else if (!guardResult2.succeeded){
        return Result.fail<Weight>(guardResult2.message);
    } else {
      return Result.ok<Weight>(new Weight({ value: weight }))
    }
  }
}