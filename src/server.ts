import http from "http";
import config from "config";
import app from "app";

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  console.log("API Gateway is listening to 4001")
);
