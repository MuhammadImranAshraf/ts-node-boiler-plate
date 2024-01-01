require("dotenv").config({ path: "./env" });
import http from "http";
import app from "app";
import Database from "database";
import config from "config";
import loggingUtil from "utils/logging.util";
const database = new Database();

const httpServer = http.createServer(app);
httpServer.listen(config.get("port"), async () => {
  await database.connect();
  loggingUtil.info("Server", `Himonk Server is Up at ${config.get("port")}`);
});
