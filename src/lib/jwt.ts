// lib/jwt.ts
import jwt from "jsonwebtoken";

const SECRET_KEY =  "supersecret";

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

