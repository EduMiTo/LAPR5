import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TimeProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export class Time extends ValueObject<TimeProps> {
  get hours (): number {
    return this.props.hours;
  }

  get minutes (): number {
    return this.props.minutes;
  }

  get seconds (): number {
    return this.props.seconds;
  }
  
  private constructor (props: TimeProps) {
    super(props);
  }

  public static create (hoursv: number, minutesv: number, secondsv: number): Result<Time> {
    const guardResultHours1 = Guard.againstNullOrUndefined(hoursv, 'time');
    const guardResultMinutes1 = Guard.againstNullOrUndefined(minutesv, 'time');
    const guardResultSeconds1 = Guard.againstNullOrUndefined(secondsv, 'time');
    const guardResultHours2 = Guard.againstNegativeValues(hoursv, 'time');
    const guardResultMinutes2 = Guard.againstNegativeValues(minutesv, 'time');
    const guardResultSeconds2 = Guard.againstNegativeValues(secondsv, 'time');
    if (!guardResultHours1.succeeded || !guardResultMinutes1.succeeded || !guardResultSeconds1.succeeded) {
      return Result.fail<Time>(guardResultHours1.message);
    } else if (!guardResultHours2.succeeded || !guardResultMinutes2.succeeded || !guardResultSeconds2.succeeded){
        return Result.fail<Time>(guardResultHours2.message);
    } else {
      return Result.ok<Time>(new Time({ hours: hoursv, minutes: minutesv, seconds: secondsv }))
    }
  }
}