import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByAuthId } from "./auth.helpers";
import Auth from "./auth.models";
import { LoginInput } from "./auth.types";

export const login = async ({ email, password }: LoginInput) => {
  try {

    const normalizedEmail = email.trim().toLowerCase();

    const authUser = await Auth.findOne({ where: { email: normalizedEmail } });
    if (!authUser) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, authUser.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const userInfo = await getUserByAuthId(authUser.user_id);
    if (!userInfo) throw new Error("User not found");

    // Short-lived access token (15min)
    const accessToken = jwt.sign(
      { id: userInfo.id, email: userInfo.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    // Long-lived refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: userInfo.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      success: true,
      message: "Login successful",
      data: { userInfo, accessToken, refreshToken },
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message || "Login failed",
    };
  }
};
