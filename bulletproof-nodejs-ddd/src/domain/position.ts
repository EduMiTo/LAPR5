import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface PositionProps {
  positionX: number;
  positionY: number;
  positionZ: number;
}

export class Position extends ValueObject<PositionProps> {
  get positionX (): number {
    return this.props.positionX;
  }

  get positionY (): number {
    return this.props.positionY;
  }

  get positionZ (): number {
    return this.props.positionZ;
  }
  
  private constructor (props: PositionProps) {
    super(props);
  }

  public static create (positionXx: number, positionYy: number, positionZz: number): Result<Position> {
    const guardResultX = Guard.againstNullOrUndefined(positionXx, 'position');
    const guardResultY = Guard.againstNullOrUndefined(positionYy, 'position');
    const guardResultZ = Guard.againstNullOrUndefined(positionZz, 'position');
    if (!guardResultX.succeeded || !guardResultY.succeeded || !guardResultZ.succeeded) {
      return Result.fail<Position>(guardResultX.message);
    }else {
      return Result.ok<Position>(new Position({ positionX: positionXx, positionY: positionYy, positionZ: positionZz }))
    }
  }
}