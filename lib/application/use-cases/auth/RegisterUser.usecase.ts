// Use Case - Business logic orchestration
import { IUserRepository } from "@/lib/domain/repositories/IUserRepository";
import { CreateUserDTO, AuthResponse } from "@/lib/domain/entities/User.entity";
import { signToken } from "@/lib/infrastructure/auth/jwt";

export class RegisterUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<AuthResponse> {
        // Business rules validation
        if (!data.email || !data.password || !data.firstName || !data.lastName) {
            throw new Error("All fields are required");
        }

        if (data.password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(data.email.toLowerCase());
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Create user
        const user = await this.userRepository.create({
            ...data,
            email: data.email.toLowerCase(),
        });

        // Generate token
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                countryCode: user.countryCode,
                role: user.role,
                emailVerified: user.emailVerified,
                avatar: user.avatar,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        };
    }
}

