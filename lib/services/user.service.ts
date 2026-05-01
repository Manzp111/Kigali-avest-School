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
    userId,
  }: {
    page: number;
    limit: number;
    email?: string | null;
    role?: UserRole | null;
    userId?: string;
  }) {
    const result = await userRepository.getUsersWithFilters({
      page,
      limit,
      email,
      role,
      userId,
      
    });

    return {
      ...result,
      data: result.data.map(({ ...user }) => user), // keep safe output
    };
  },
  async getUserById(id: string) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
},
async updateUser(
  id: string,
  data: Partial<{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }>
) {
  const existing = await userRepository.findById(id);

  if (!existing) {
    throw new Error("User not found");
  }

  const updated = await userRepository.updateUser(id, data);

  return updated;
},
async deleteUser(id: string) {
  const existing = await userRepository.findById(id);

  if (!existing) {
    throw new Error("User not found");
  }

  const deleted = await userRepository.deleteUser(id);

  return deleted;
},
};