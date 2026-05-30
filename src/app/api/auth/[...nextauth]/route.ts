import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "temp_placeholder_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "temp_placeholder_google_secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "temp_placeholder_facebook_id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "temp_placeholder_facebook_secret",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "zafraan_jwt_secret_key_2026",
  pages: {
    signIn: "/my-account",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
