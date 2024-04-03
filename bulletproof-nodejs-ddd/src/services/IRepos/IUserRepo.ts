import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserPhone } from "../../domain/userPhone";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserRepo extends Repo<User> {
    findAll(): Promise<Array<IUserDTO>>;
    save(user: User): Promise<User>;
    findByEmail (email: UserEmail | string): Promise<User>;
    findById (id: string): Promise<User>;
    findByPhone (phone: UserPhone | string): Promise<User>;
}