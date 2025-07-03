import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: "admin" | "user";
}
