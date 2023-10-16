import Joi from "joi";
import prisma from "../prisma/client";
import { generateJWT } from "../utils/jwt";
import { generateSalt, hashPassword, verifyPassword } from "../utils/password";
import { exclude } from "../utils/user";

const signupSchema = Joi.object({
  firstName: Joi.string().alphanum(),
  lastName: Joi.string().alphanum(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const schemaRes = signupSchema.validate(req.body);
  if (schemaRes.error) {
    return res.json(schemaRes.error.details);
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
      firstName,
      lastName,
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

  const schemaRes = loginSchema.validate(req.body);
  if (schemaRes.error) {
    return res.json(schemaRes.error.details);
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
