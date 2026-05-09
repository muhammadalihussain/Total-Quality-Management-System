import jwt from "jsonwebtoken";

const SECRET = 'process.env.JWT_SECRET!';

export const signToken = (payload: any) =>
  jwt.sign(payload, SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET);