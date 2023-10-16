export default async function allowIfAdmin(req, res, next) {
  try {
    if (req.user.isAdmin || !!req.query.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        error: "You cannot access this route",
      });
    }
  } catch (error) {
    next(error);
  }
}
