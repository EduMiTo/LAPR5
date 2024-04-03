import { Result } from "../../core/logic/Result";
import { IPathDTO } from "../../dto/IPathDTO";

export default interface IPathService  {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  getPathsByWarehouseStart(idWharehouseStart: string): Promise<Result<Array<IPathDTO>>>;
  getPathsByWarehouseEnd(idWharehouseEnd: string): Promise<Result<Array<IPathDTO>>>;
  getPathsByWarehouses(idWharehouseStart: string, idWharehouseEnd: string): Promise<Result<IPathDTO>>;
  getPaths(): Promise<Result<Array<IPathDTO>>>;
  deletePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
}
