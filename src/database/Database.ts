import logging from "utils/logging.util";
import mongoose from "mongoose";
import config from "config";

class Database {
  connect = async () => {
    try {
      await mongoose.connect(config.get("database.url"));
      logging.info("Database", "Database is on duty");
    } catch (error) {
      throw Error(error.toString());
    }
  };
}

export default Database;
