import { Session, User } from "next-auth";

export interface CustomSession extends Session {
  user: User & { id: string };
}
