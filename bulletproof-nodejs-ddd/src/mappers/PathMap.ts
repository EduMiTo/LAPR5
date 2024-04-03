import { Mapper } from "../core/infra/Mapper";

import {IPathDTO} from "../dto/IPathDTO";

import { Path } from "../domain/path";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Weight } from "../domain/weight";
import { Energy } from "../domain/energy";
import { Distance } from "../domain/distance";
import { Time } from "../domain/time";
import { TruckPlate } from "../domain/truckPlate";

export class PathMap extends Mapper<Path> {

  public static toDTO( path: Path): IPathDTO {
    return {
      id: path.id.toString(),
      idWarehouseStart: path.idWarehouseStart,
      idWarehouseEnd: path.idWarehouseEnd,
      //idTrip: path.idTrip,
      distance: path.distance,
      time: path.time,
      energy: path.energy,
      extraTime: path.extraTime,
    } as IPathDTO;
  }

  public static async toDomain (raw: any): Promise<Path> {
    const distanceOrError = Distance.create(raw.distance);
    const timeOrError = Time.create(raw.time.hours, raw.time.minutes, raw.time.seconds);
    const energyOrError = Energy.create(raw.energy);
    const extraTimeOrError = Time.create(raw.extraTime.hours, raw.extraTime.minutes, raw.extraTime.seconds);

    if (distanceOrError.isFailure || timeOrError.isFailure || energyOrError.isFailure || extraTimeOrError.isFailure){
      return null;
    }
    
    const pathOrError = Path.create({
      idWarehouseStart: raw.idWarehouseStart,
      idWarehouseEnd: raw.idWarehouseEnd,
      distance: raw.distance,
      time: raw.time,
      energy: raw.energy,
      extraTime: raw.extraTime,
    }, new UniqueEntityID(raw.id))

    pathOrError.isFailure ? console.log(pathOrError.error) : '';
    
    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence (path: Path): any {
    const a = {
      id: path.id,
      idWarehouseStart: path.idWarehouseStart,
      idWarehouseEnd: path.idWarehouseEnd,
      //idTrip: path.idTrip,
      distance: path.distance,
      time: path.time,
      energy: path.energy,
      extraTime: path.extraTime,
    }
    return a;
  }

  public static isValid (raw: any): any{
    const distanceOrError = Distance.create(raw.distance);
    const timeOrError = Time.create(raw.time.hours, raw.time.minutes, raw.time.seconds);
    const energyOrError = Energy.create(raw.energy);
    const extraTimeOrError = Time.create(raw.extraTime.hours, raw.extraTime.minutes, raw.extraTime.seconds);

    if (distanceOrError.isFailure || timeOrError.isFailure || energyOrError.isFailure || extraTimeOrError.isFailure){
      if(distanceOrError.isFailure) return distanceOrError.error;
      if(timeOrError.isFailure) return timeOrError.error;
      if(energyOrError.isFailure) return energyOrError.error;
      if(extraTimeOrError.isFailure) return extraTimeOrError.error;
    }

    return true;
  }

}