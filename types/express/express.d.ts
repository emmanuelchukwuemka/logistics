import { UserAttributes } from "../modules/users/user.models";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserAttributes>;
    }
  }
}
