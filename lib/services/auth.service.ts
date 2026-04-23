import { userRepository } from "@/lib/repositories/user.repository";
import { hashPassword,comparePassword } from "@/lib/utils/hash";


export const authService = {
  async signup(data: {
    email: string;
    phone: string;
    password: string;
  }) {
    // check existing user
    const existing = await userRepository.findByEmailOrPhone(
      data.email,
      data.phone
    );

    if (existing.length > 0) {
      throw new Error("User already exists");
    }

    // hash password
    const hashed = await hashPassword(data.password);

    // create user
    const user = await userRepository.createUser({
      email: data.email,
      phone: data.phone,
      password: hashed,
    });

    // remove password
    const { password, ...safeUser } = user;

    return safeUser;
  },

  async login(data: { email: string; password: string }) {
  

const user = await userRepository.findByEmail(data.email);

if (!user) {
  throw new Error("Invalid credentials");
}

if (!user.password) {
  // console.log("❌ USER PASSWORD MISSING IN DB");
  throw new Error("Database error: password missing");
}


const isMatch = await comparePassword(
  data.password,
  user.password
);



if (!isMatch) {
  console.log("❌ PASSWORD MISMATCH DETECTED");
  throw new Error("Invalid credentials");
}

const { password, ...safeUser } = user;



return safeUser;
}
};