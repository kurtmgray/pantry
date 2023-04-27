import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // handle auth
        // if (!credentials.email || !credentials.password) return null
        // const user = await someDBfn({ email: credentials.email })
        // if (!user) return null
        // const checkPWD = await compare(onePwd, anotherPwd)
        // if (!checkPWD) return null
        // returning null tells auth that incorrect credentials were entered
        // return user

        // but for now...
        const user = {
          id: "1",
          name: "Kurt",
          email: "test@email.com",
          randomKey: "weird",
        };
        // this return gets passed to the jwt callback below
        return user;
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
