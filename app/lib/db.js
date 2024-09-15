import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Connected from previous instance");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      autoIndex: true,
    };

    const mongooseInstance = new mongoose.Mongoose();

    cached.promise = mongooseInstance
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  console.log("Newly connected");
  return cached.conn;
}

export default dbConnect;
