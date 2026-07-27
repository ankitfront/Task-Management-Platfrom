import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
