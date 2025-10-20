import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/data/env";

export const db = drizzle(env.DATABASE_URL);
