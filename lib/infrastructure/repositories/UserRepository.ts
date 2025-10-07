// Repository Implementation - Data access layer
import { IUserRepository } from "@/lib/domain/repositories/IUserRepository";
import { UserEntity, CreateUserDTO } from "@/lib/domain/entities/User.entity";
import User from "@/lib/infrastructure/database/models/User";
import connectDB from "@/lib/infrastructure/database/mongodb";
import { hashPassword } from "@/lib/infrastructure/auth/password";

export class UserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<UserEntity> {
        await connectDB();
        
        const hashedPassword = await hashPassword(data.password);
        
        const user = await User.create({
            ...data,
            password: hashedPassword,
        });

        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            countryCode: user.countryCode,
            avatar: user.avatar,
            role: user.role,
            emailVerified: user.emailVerified,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UserEntity;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        await connectDB();
        
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return null;

        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            countryCode: user.countryCode,
            avatar: user.avatar,
            role: user.role,
            emailVerified: user.emailVerified,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UserEntity;
    }

    async findById(id: string): Promise<UserEntity | null> {
        await connectDB();
        
        const user = await User.findById(id);
        if (!user) return null;

        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            countryCode: user.countryCode,
            avatar: user.avatar,
            role: user.role,
            emailVerified: user.emailVerified,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UserEntity;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {
        await connectDB();
        
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) return null;

        return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            countryCode: user.countryCode,
            avatar: user.avatar,
            role: user.role,
            emailVerified: user.emailVerified,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UserEntity;
    }
}

