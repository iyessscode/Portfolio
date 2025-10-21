import dotenv from "dotenv";

dotenv.config({
  path: `${process.env.NODE_ENV !== "production" ? ".env.development" : ".env.production"}`,
});

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
  RESEND_SENDER_EMAIL: process.env.RESEND_SENDER_EMAIL as string,
};
