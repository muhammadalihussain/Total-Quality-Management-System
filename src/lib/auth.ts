import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}