import logging from "utils/logging.util";
import config from "config";
import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    await mongoose.connect(config.database.url);
    logging.info("Database", "Database is on duty");
  } catch (error) {
    throw Error(error.toString());
  }
};
