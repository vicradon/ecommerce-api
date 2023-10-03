import jwt from "jsonwebtoken";

export const generateJWT = (user) => {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const verifyJWT = (token) =>
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) throw new Error(err);
    return decoded;
  });
