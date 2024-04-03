import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface TripProps {
    value: string;
  }
  
  export class TripDesignation extends ValueObject<TripProps> {
    get value (): string {
      return this.props.value;
    }
    
    private constructor (props: TripProps) {
      super(props);
    }
  
    public static create (designation: string): Result<TripDesignation> {
      const guardResult = Guard.againstNullOrUndefined(designation, 'trip designation');
      if (!guardResult.succeeded) {
        return Result.fail<TripDesignation>(guardResult.message);
      } else {
        return Result.ok<TripDesignation>(new TripDesignation({ value: designation }))
      }
    }
  }