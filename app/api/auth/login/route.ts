import { NextRequest, NextResponse } from "next/server";
import { LoginUserUseCase } from "@/lib/application/use-cases/auth/LoginUser.usecase";
import { UserRepository } from "@/lib/infrastructure/repositories/UserRepository";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const userRepository = new UserRepository();
        const loginUserUseCase = new LoginUserUseCase(userRepository);
        
        const result = await loginUserUseCase.execute(body);

        return NextResponse.json({
            success: true,
            data: {
                userId: result.user.id,
                email: result.user.email,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                role: result.user.role,
            },
            token: result.token,
        });
    } catch (error: unknown) {
        console.error("Login error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Login failed",
            },
            { status: 401 }
        );
    }
}

