import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import connect from "./lib/utils";
import User from "@/models/User";


export const authOptions = { 
  providers: [
    CredentialsProvider({
      id: "credentials",
      username: "Credentials",
      async authorize(credentials) {  
        //Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            username: credentials.username,
          });

          if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

          if (user) {
            //check password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Identifiants incorrects!");
            }
          } else {
            throw new Error("Utilisateur introuvable!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user._doc };
      }
      return token;
    },
    async session({ session, token }) { 
      if (token) {
        session.user = { ...session.user, ...token }; 
      }
      return session;
    },
  },
  pages: {
    error: "/connexion", 
  },
};

export const getAuthSession = () => getServerSession(authOptions);
