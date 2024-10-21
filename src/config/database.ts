import mongoose from "mongoose";

const connect = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URI as string);
  if (!connection) {
    console.log("DATABASE connection failed! Exiting Now");
    process.emit("SIGTERM");
    process.exit(1);
  }
  console.log("DATABASE connected successfully!");
  return connection;
};

export default { connect };

