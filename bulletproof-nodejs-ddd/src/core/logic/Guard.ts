
export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine (guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefined (argument: any, argumentName: string): IGuardResult {
    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is null or undefined` }
    } else {
      return { succeeded: true }
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true }
  }

  public static isOneOf (value: any, validValues: any[], argumentName: string) : IGuardResult {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true }
    } else {
      return { 
        succeeded: false, 
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".` 
      }
    }
  }

  public static inRange (num: number, min: number, max: number, argumentName: string) : IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.`}
    } else {
      return { succeeded: true }
    }
  }

  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : IGuardResult {
    let failingResult: IGuardResult = null;
    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return { succeeded: false, message: `${argumentName} is not within the range.`}
    } else {
      return { succeeded: true }
    }
  }

  public static againstNegativeValues (argument: number, argumentName: string): IGuardResult {
    if (argument < 0) {
      return { succeeded: false, message: `${argumentName} can't be negative.` }
    } else {
      return { succeeded: true }
    }
  }

  public static againstInvalidPlates (argument: string, argumentName: string): IGuardResult {
    let sampleRegEx: RegExp = /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/;
    if (!sampleRegEx.test(argument)) {
      return { succeeded: false, message: `${argumentName} is not a valid plate.` }
    } else {
      return { succeeded: true }
    }
  }

  public static againstInvalidPhoneNumber (argument: string, argumentName: string): IGuardResult {
    let sampleRegEx: RegExp =  /^9[1236]\d{7}$/;
    if (!sampleRegEx.test(argument)) {
      return { succeeded: false, message: `${argument} is not a valid phone number. Must have 9 digits, starting with 91, 92, 93 or 96.`}
    } else {
      return { succeeded: true }
    }
  }

  public static againstInvalidEmail (argument: string, argumentName: string): IGuardResult {
    let sampleRegEx: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!sampleRegEx.test(argument)) {
      return { succeeded: false, message: `${argument} is not a valid email.`}
    } else {
      return { succeeded: true }
    }
  }
}