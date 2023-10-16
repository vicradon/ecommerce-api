import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

export default async function allowIfLoggedin(req, res, next) {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.slice(7);
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({
            error: "You have been logged out. Login again to access this route",
          });
        }
        req.user = await prisma.user.findFirst(user.user);
        next();
      });
    } else {
      return res.status(401).json({
        error: "No token supplied",
      });
    }
  } catch (error) {
    next(error);
  }
}
