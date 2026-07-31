"use strict";
exports.__esModule = true;
exports.auth = void 0;
var better_auth_1 = require("better-auth");
var mongodb_1 = require("mongodb");
var mongodb_2 = require("better-auth/adapters/mongodb");
var mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!mongoUri) {
    throw new Error("MONGODB_URI (or DATABASE_URL) is not set. Add it in your Vercel project's Environment Variables (Production, Preview, and Development) and redeploy.");
}
var client = new mongodb_1.MongoClient(mongoUri);
var db = client.db("ZenBoard");
exports.auth = better_auth_1.betterAuth({
    database: mongodb_2.mongodbAdapter(db, { client: client }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    }
});
