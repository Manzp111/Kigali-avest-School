import { userRepository } from "@/lib/repositories/user.repository";
import type { UserRole } from "@/lib/repositories/user.repository";

export const userService = {
  //
  // 👮 GET ALL USERS (sanitized)
  //
  async getAllUsers() {
    const users = await userRepository.getAllUsers();

    return users.map(({ ...user }) => user);
  },

  //
  // 🔎 FILTER USERS (type-safe + clean response)
  //
  async getUsers({
    page,
    limit,
    email,
    role,
  }: {
    page: number;
    limit: number;
    email?: string | null;
    role?: UserRole | null; // ✅ FIXED TYPE
  }) {
    const result = await userRepository.getUsersWithFilters({
      page,
      limit,
      email,
      role,
    });

    return {
      ...result,
      data: result.data.map(({ ...user }) => user), // keep safe output
    };
  },
};