import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Packing } from "../domain/packing";
import { IPackingDTO } from "../dto/IPackingDTO";
import { Position } from "../domain/position";

export class PackingMap extends Mapper<Packing> {

  public static toDTO( packing: Packing): IPackingDTO {
    return {
      id: packing.id.toString(),
      deliveryId: packing.deliveryId.toString(),
      position: packing.position,
      truckPlate: packing.truckPlate
    } as IPackingDTO;
  }

  public static async toDomain (raw: any): Promise<Packing> {
    

    const packingOrError = Packing.create({
      position: raw.position,
      deliveryId: raw.deliveryId,
      truckPlate: raw.truckPlate
    }, new UniqueEntityID(raw.id))
    
    packingOrError.isFailure ? console.log(packingOrError.error) : '';
    
    return packingOrError.isSuccess ? packingOrError.getValue() : null;
  }

  public static toPersistence (packing: Packing): any {
    const a = {
      id: packing.id,
      position: packing.position,
      deliveryId: packing.deliveryId,
      truckPlate: packing.truckPlate
    }
    return a;
  }

  public static isValid (raw: any): any{
    const positionOrError = Position.create(raw.position.positionX,raw.position.positionY,raw.position.positionZ);
    
    if (positionOrError.isFailure){
      return positionOrError.error;
    }

    return true;
  }

  
}