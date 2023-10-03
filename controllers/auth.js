import Joi from "joi";
import prisma from "../prisma/client";
import { generateJWT } from "../utils/jwt";
import { generateSalt, hashPassword, verifyPassword } from "../utils/password";
import { exclude } from "../utils/user";

const signupSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    signupSchema.validate(req.body);
  } catch (error) {
    next(error);
  }

  const userExists = await prisma.user.findFirst({ where: { email } });

  if (userExists) {
    return res.status(409).json({ message: "Email already taken" });
  }

  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      salt,
    },
  });

  const token = generateJWT(user);

  return res
    .status(201)
    .json({ message: "Sign up successful!", user: exclude(user), token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    loginSchema.validate(req.body);
  } catch (error) {
    next(error);
  }

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Invalid login credentials" });
  }

  const isMatch = await verifyPassword(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid login credentials" });
  }

  const token = generateJWT(user);

  return res
    .status(201)
    .json({ message: "Log in successful!", user: exclude(user), token });
};
