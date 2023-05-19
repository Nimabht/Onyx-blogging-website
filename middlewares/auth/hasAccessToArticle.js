import AppError from "../../utils/AppError.js";

export default (req, res, next) => {
  const session = req.session;
  //If user is admin, can access to the next middleware
  if (session.user.role === "admin") {
    return next();
  }
  //If user is blogger, can access to the next middleware if it's requested its own data
  const userIdInArticle = res.locals.article.author._id.toString();
  if (userIdInArticle === session.user._id) {
    return next();
  }

  const ex = new AppError("Unauthorized", "fail", 401);
  return next(ex);
};
