import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          // // Create a new user if not found
          // const newUser = await prisma.user.create({
          //   data: {
          //     email: credentials.email,
          //     password: await bcrypt.hash(credentials.password, 10),
          //   },
          // });
          // return newUser;
          return null;
        }

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        // this return gets passed to the jwt callback below
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      //   console.log("Session Callback", { token, session });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.key,
        },
      };
    },
    jwt: ({ token, user }) => {
      //   console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as any;
        return { ...token, id: u.id, key: u.randomKey };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
