import dotenv from "dotenv";
dotenv.config();

const server = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
};
const jwt = {
  secret: process.env.JWT_SECRET,
  expiry: process.env.JWT_EXPIRY,
};

const database = {
  url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`,
};

export default { server, jwt, database };
