import { Result } from "../../core/logic/Result";
import IRoleDTO from "../../dto/IRoleDTO";

export default interface IRoleService  {
  createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  getRoles(): Promise<Result<Array<IRoleDTO>>>;
  getRoleByName (roleName: string): Promise<Result<IRoleDTO>>;
  getRoleNameById (roleName: string): Promise<Result<String>>;
  getUserLogistic(): Promise<Result<Number>>;
  getUserShipping(): Promise<Result<Number>>;
  getUserWarehouse(): Promise<Result<Number>>;
}