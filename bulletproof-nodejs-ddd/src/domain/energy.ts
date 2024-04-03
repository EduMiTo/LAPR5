import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface EnergyProps {
  value: number;
}

export class Energy extends ValueObject<EnergyProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EnergyProps) {
    super(props);
  }

  public static create (energy: number): Result<Energy> {
    const guardResult1 = Guard.againstNullOrUndefined(energy, 'energy');
    const guardResult2 = Guard.againstNegativeValues(energy, 'energy');
    if (!guardResult1.succeeded) {
      return Result.fail<Energy>(guardResult1.message);
    } else if (!guardResult2.succeeded){
        return Result.fail<Energy>(guardResult2.message);
    } else {
      return Result.ok<Energy>(new Energy({ value: energy }))
    }
  }
}