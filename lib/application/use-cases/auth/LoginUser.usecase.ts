// Use Case - Business logic orchestration
import { IUserRepository } from "@/lib/domain/repositories/IUserRepository";
import { LoginDTO, AuthResponse } from "@/lib/domain/entities/User.entity";
import { signToken } from "@/lib/infrastructure/auth/jwt";
import { comparePassword } from "@/lib/infrastructure/auth/password";

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: LoginDTO): Promise<AuthResponse> {
        // Validation
        if (!data.email || !data.password) {
            throw new Error("Email and password are required");
        }

        // Find user
        const user = await this.userRepository.findByEmail(data.email.toLowerCase());
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const isValid = await comparePassword(data.password, user.password as string);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

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

