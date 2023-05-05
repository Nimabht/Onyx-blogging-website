import { User } from "../../models/user";
import AppError from "../../utils/AppError";
import isValidObjectId from "../../validators/ObjectId";

export default async function (req, _res, next, userId) {
  try {
    if (!isValidObjectId(userId)) {
      const ex = AppError.badRequest("Invalid userId");
      return next(ex);
    }
    const user = await User.findById(userId).select("-__v -password");
    if (!user) {
      const ex = AppError.notFound("User not found");
      return next(ex);
    }
    res.locals.user = user;
    next();
  } catch (error) {
    const ex = AppError.internal(error.message);
    return next(ex);
  }
}
