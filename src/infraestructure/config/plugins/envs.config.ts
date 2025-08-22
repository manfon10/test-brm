import "dotenv/config";

import { get } from "env-var";

export const envs = {
  APP_PORT: get("APP_PORT").asPortNumber(),
  NODE_ENV: get("NODE_ENV").asString(),
  DB_USER: get("DB_USER").asString(),
  DB_PASSWORD: get("DB_PASSWORD").asString(),
  DB_HOST: get("DB_HOST").asString(),
  DB_NAME: get("DB_NAME").asString(),
  DB_PORT: get("DB_PORT").asPortNumber(),
  JWT_SECRET: get("JWT_SECRET").asString(),
  JWT_ACCESS_EXPIRES: get("JWT_ACCESS_EXPIRES").asString(),
  JWT_REFRESH_EXPIRES: get("JWT_REFRESH_EXPIRES").asString(),
};
