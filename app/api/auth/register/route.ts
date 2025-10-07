import { NextRequest, NextResponse } from "next/server";
import { RegisterUserUseCase } from "@/lib/application/use-cases/auth/RegisterUser.usecase";
import { UserRepository } from "@/lib/infrastructure/repositories/UserRepository";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const userRepository = new UserRepository();
        const registerUserUseCase = new RegisterUserUseCase(userRepository);
        
        const result = await registerUserUseCase.execute(body);

        return NextResponse.json(
            {
                success: true,
                data: {
                    userId: result.user.id,
                    email: result.user.email,
                    firstName: result.user.firstName,
                    lastName: result.user.lastName,
                    role: result.user.role,
                },
                token: result.token,
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Registration failed",
            },
            { status: 400 }
        );
    }
}

