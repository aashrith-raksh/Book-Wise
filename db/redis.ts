import config from "@/lib/config";
import { Redis } from "@upstash/redis";

// console.log(config.env);
const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
});

export default redis;

// (async () => {
//   try {
//     const data = await redis.get("key");
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
