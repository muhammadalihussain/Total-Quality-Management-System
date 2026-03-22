import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const SECRET = '12345667';
const secret = new TextEncoder().encode(SECRET);

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.error("JWT Error:", err);
    return null; // avoid crash
  }
  
}

export function getPayload(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded; // ✅ full payload
  } catch (err) {
    console.error("JWT error:", err);
    return null;
  }
}

export async function getPayloadEdge(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // ✅ payload only
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}