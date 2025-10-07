// Repository Interface - Defines contract for data access
import { UserEntity, CreateUserDTO } from "../entities/User.entity";

export interface IUserRepository {
    create(data: CreateUserDTO): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null>;
}

