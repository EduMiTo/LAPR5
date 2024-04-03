import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/path";
import { PathId } from "../../domain/pathId";

export default interface IUserRepo extends Repo<Path> {
	save(user: Path): Promise<Path>;
    findByDomainId (id: PathId | string): Promise<Path>;
    findByWarehouseStart (wharehouseId: string): Promise<Array<Path>>;
    findByWarehouseEnd (wharehouseId: string): Promise<Array<Path>>;
    findByWarehouses (wharehouseIdStart: string, wharehouseIdEnd: string): Promise<Path>;
    findAll(): Promise<Array<Path>>;
    delete(path: Path): Promise<Path>;
}
  