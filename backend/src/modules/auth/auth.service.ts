import prisma from "../../shared/db/prisma";
import { AppError } from "../../shared/errors/AppError";
import { LoginInput, RegisterInput } from "./auth.validation";
import bcrypt from "bcryptjs";
import { generateToken } from "../../shared/utils/jwt";

export class AuthService {
  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !user.passwordHash) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        profilePicture: user.profilePicture,
      },
    };
  }

  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return createdUser;
  }

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        provider: true,
        profilePicture: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export const authService = new AuthService();