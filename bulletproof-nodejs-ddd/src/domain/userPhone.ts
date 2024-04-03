import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface UserPhoneProps {
  value: string;
}

export class UserPhone extends ValueObject<UserPhoneProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: UserPhoneProps) {
    super(props);
  }

  public static create (phone: string): Result<UserPhone> {
    const guardResult1 = Guard.againstNullOrUndefined(phone, 'phone');
    const guardResult2 = Guard.againstInvalidPhoneNumber(phone, 'phone');
    if (!guardResult1.succeeded) {
      return Result.fail<UserPhone>(guardResult1.message);
    } else if (!guardResult2.succeeded){
        return Result.fail<UserPhone>(guardResult2.message);
    } else {
      return Result.ok<UserPhone>(new UserPhone({ value: phone }))
    }
  }
  public static anonymize(): UserPhone{
    var result           = '91';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return new UserPhone({ value: result });
  }
}