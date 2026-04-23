import { userRepository } from "@/lib/repositories/user.repository";

export const userService = {
  async getAllUsers() {
    const users = await userRepository.getAllUsers();

    return users.map(({ password, ...user }) => user);
  },
};