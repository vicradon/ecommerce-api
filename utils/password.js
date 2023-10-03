import bcrypt from "bcrypt";

export const generateSalt = async () => {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  return await bcrypt.genSalt(saltRounds);
};

export const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
