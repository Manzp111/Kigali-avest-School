import { userRepository } from "@/lib/repositories/user.repository";
import { hashPassword, comparePassword } from "@/lib/utils/hash";

class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ConflictError extends AppError {}
class UnauthorizedError extends AppError {}

export const authService = {
  async signup(data: {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const existing = await userRepository.findByEmailOrPhone(
      data.email,
      data.phone
    );

    if (existing) {
      throw new ConflictError("User already exists");
    }

    const hashed = await hashPassword(data.password);

    const user = await userRepository.createUser({
      email: data.email,
      phone: data.phone,
      password: hashed,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    const { password, ...safeUser } = user;
    return safeUser;
  },

  async login(data: { email: string; password: string }) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    if (!user.isVerified) {
    throw new UnauthorizedError("Account not verified. Please contact the HeadTeacher to verify your account.");
  }

    const { password, ...safeUser } = user;
    return safeUser;
  },
};