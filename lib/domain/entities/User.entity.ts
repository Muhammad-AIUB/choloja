// Domain Entity - Pure business logic, no framework dependencies
export interface UserEntity {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
    avatar?: string;
    role: "user" | "admin" | "owner";
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: Omit<UserEntity, "password">;
    token: string;
}

