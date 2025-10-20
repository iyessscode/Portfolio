import dotenv from "dotenv";

dotenv.config({
  path: `${process.env.NODE_ENV !== "production" ? ".env.development" : ".env.production"}`,
});

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
};
