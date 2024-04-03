import { Mapper } from "../core/infra/Mapper";

import {ITruckDTO} from "../dto/ITruckDTO";

import { Truck } from "../domain/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Weight } from "../domain/weight";
import { Energy } from "../domain/energy";
import { Distance } from "../domain/distance";
import { Time } from "../domain/time";
import { TruckPlate } from "../domain/truckPlate";

export class TruckMap extends Mapper<Truck> {

  public static toDTO( truck: Truck): ITruckDTO {
    return {
      id: truck.id.toString(),
      plate: truck.plate,
      tare: truck.tare,
      massCapacity: truck.massCapacity,
      maximumBattery: truck.maximumBattery,
      autonomy: truck.autonomy,
      chargeTime: truck.chargeTime,
      active: truck.active
    } as ITruckDTO;
  }

  public static async toDomain (raw: any): Promise<Truck> {
    const truckPlateOrError = TruckPlate.create(raw.plate);
    const truckTareOrError = Weight.create(raw.tare);
    const truckMassCapacityOrError = Weight.create(raw.massCapacity);
    const truckMaximumBatteryOrError = Energy.create(raw.maximumBattery);
    const truckAutonomyOrError = Distance.create(raw.autonomy);
    const truckChargeTimeOrError = Time.create(raw.chargeTime.hours, raw.chargeTime.minutes, raw.chargeTime.seconds);

    if (truckPlateOrError.isFailure || truckTareOrError.isFailure || truckMassCapacityOrError.isFailure || truckMaximumBatteryOrError.isFailure || truckAutonomyOrError.isFailure || truckChargeTimeOrError.isFailure){
      return null;
    }

    const truckOrError = Truck.create({
      plate: raw.plate,
      tare: raw.tare,
      massCapacity: raw.massCapacity,
      maximumBattery: raw.maximumBattery,
      autonomy: raw.autonomy,
      chargeTime: raw.chargeTime,
      active: raw.active
    }, new UniqueEntityID(raw.id))
    
    truckOrError.isFailure ? console.log(truckOrError.error) : '';
    
    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {
    const a = {
      id: truck.id,
      plate: truck.plate,
      tare: truck.tare,
      massCapacity: truck.massCapacity,
      maximumBattery: truck.maximumBattery,
      autonomy: truck.autonomy,
      chargeTime: truck.chargeTime,
      active: truck.active
    }
    return a;
  }

  public static isValid (raw: any): any{
    const truckPlateOrError = TruckPlate.create(raw.plate);
    const truckTareOrError = Weight.create(raw.tare);
    const truckMassCapacityOrError = Weight.create(raw.massCapacity);
    const truckMaximumBatteryOrError = Energy.create(raw.maximumBattery);
    const truckAutonomyOrError = Distance.create(raw.autonomy);
    const truckChargeTimeOrError = Time.create(raw.chargeTime.hours, raw.chargeTime.minutes, raw.chargeTime.seconds);

    if (truckPlateOrError.isFailure || truckTareOrError.isFailure || truckMassCapacityOrError.isFailure || truckMaximumBatteryOrError.isFailure || truckAutonomyOrError.isFailure || truckChargeTimeOrError.isFailure){
      if(truckPlateOrError.isFailure) return truckPlateOrError.error;
      if(truckTareOrError.isFailure) return truckTareOrError.error;
      if(truckMassCapacityOrError.isFailure) return truckMassCapacityOrError.error;
      if(truckMaximumBatteryOrError.isFailure) return truckMaximumBatteryOrError.error;
      if(truckAutonomyOrError.isFailure) return truckAutonomyOrError.error;
      if(truckChargeTimeOrError.isFailure) return truckChargeTimeOrError.error;
    }
    return true;
  }
}