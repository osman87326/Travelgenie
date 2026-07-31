import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI (or DATABASE_URL) is not set. Add it in your Vercel project's Environment Variables (Production, Preview, and Development) and redeploy."
  );
}

const client = new MongoClient(mongoUri);
const db = client.db("ZenBoard");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});