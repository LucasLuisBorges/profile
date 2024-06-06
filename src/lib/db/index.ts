import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("UPSTASH_REDIS_REST_TOKEN is not defined");
}

const redis = new Redis({
  url: "https://cunning-lark-33983.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
