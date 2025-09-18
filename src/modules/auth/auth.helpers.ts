import User from "../user/user.models";

export const getUserByAuthId = async (authUserId: number) => {
  try {
    const user = await User.findOne({where: { id: authUserId }});

    return user ? user.get({ plain: true }) : null;
  } catch (error) {
    console.error("Error fetching user by authId:", error);
    return null;
  }
};
