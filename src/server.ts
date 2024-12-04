// import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server should run on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();


