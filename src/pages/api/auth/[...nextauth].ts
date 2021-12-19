import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      console.log(user);
      const { email } = user;

      try {
        // await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
