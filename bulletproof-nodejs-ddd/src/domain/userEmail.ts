import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value (): string {
    return this.props.value;
  }

  private constructor (props: UserEmailProps) {
    super(props);
  }

  public static create (email: string): Result<UserEmail> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    const guardResult2 = Guard.againstInvalidEmail(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<UserEmail>(guardResult.message);
    } else if (!guardResult2.succeeded){
      return Result.fail<UserEmail>(guardResult2.message);
    } else {
      return Result.ok<UserEmail>(new UserEmail({ value: email }))
    }
  }

  public static anonymize(): UserEmail{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result+='@eletric-go.com';
    return new UserEmail({ value: result });
  }
}