import app from "./app";
import config, { checkEnv, envConfig } from "./app/config";
import mongoose from "mongoose";


async function main() {
  try {
    checkEnv();

    await mongoose.connect(envConfig.database_url);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${envConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
