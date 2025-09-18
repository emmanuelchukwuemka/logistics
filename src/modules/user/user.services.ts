import { signupInput } from "./user.validations";
import User, { UserCreationAttributes } from "./user.models";
import Auth, { AuthCreationAttributes } from "../auth/auth.models";
import bcrypt from "bcrypt";

export const signupService = async (data: signupInput) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData: UserCreationAttributes = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email.trim().toLocaleLowerCase(),
      phone: data.phone,
      city_id: data.city_id,
      is_verified: 0,
    };

    // Insert into the database
    const newUser = await User.create(userData);

    // Prepare auth data
    const authData: AuthCreationAttributes = {
      user_id: newUser.id,
      email: data.email,
      password: hashedPassword,
    };

    // Insert into auth_table
    await Auth.create(authData);

    return {
      success: true,
      message: "User created successfully",
      data: { id: newUser.id },
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
};

export const profile = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User profile accessed successfully",
      data: user.get({ plain: true }),
    };
  } catch (error) {
    console.error("Profile error:", error);
    return {
      success: false,
      message: "Unable to service this request",
    };
  }
};